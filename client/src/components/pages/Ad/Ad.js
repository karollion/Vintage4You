import styles from './Ad.module.scss';
import { getAdById } from "../../../redux/adsRedux";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import { IMGS_URL } from '../../../config';
import Container from '../../common/container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import SearchForm from '../../features/SearchForm/SearchForm';

const Ad = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));

  const handleBack = e => {
    e.preventDefault();
    navigate('/');
  };

  const handleEdit = e => {
    e.preventDefault();
    if (ad?._id) navigate("/ad/editAd/" + ad._id);
  };

  const handleDelete = e => {
    e.preventDefault();
    if (ad?._id) navigate("/ad/deleteAd/" + ad._id);
  };

  // 1. Jeśli brak ogłoszenia – przekieruj
  if (!ad) return <Navigate to="/" />;

  // 2. Bezpieczne sprawdzenie czy zalogowany użytkownik jest autorem
  // obsługa różnych struktur Reduxa (user?.id lub user?.user?.id oraz ad?.user?._id)
  const currentUserId = user?.user?._id || user?.user?.id || user?._id || user?.id;
  const adUserId = typeof ad.user === 'object' ? ad.user?._id : ad.user;
  const isAuthor = currentUserId && adUserId && currentUserId === adUserId;

  // 3. Bezpieczne formatowanie daty
  const formattedDate = ad.date 
    ? (typeof ad.date === 'string' ? ad.date.substring(0, 10) : new Date(ad.date).toISOString().substring(0, 10))
    : '';

  return (
    <div className={styles.root}>
      <SearchForm />
      <Container>
        <div className={styles.box}>
          <div className={styles.body}>
            <Col xs='12' className='d-flex justify-content-center my-3'>
              <Button className={styles.btn} action={handleBack}>Back to home</Button>
            </Col>
            
            <img 
              src={ad.picture ? IMGS_URL + ad.picture : ''} 
              alt={ad.title || 'Ad image'} 
              className={styles.img} 
            />
            
            <div className={styles.adBoxs}>
              <h3>{ad.title}</h3>
              <p className={styles.price}>{ad.price}$</p>
              <p><span>Location: </span>{ad.location}</p>
              <p><span>Published date / last edited: </span>{formattedDate}</p>
              <p><span>Description:</span></p>
              <p>{ad.content}</p>
              
              {isAuthor && (
                <Row className="d-flex justify-content-center mt-3">
                  <Col xs='12' md='6' className='d-flex justify-content-center'>
                    <Button action={handleEdit}>Edit</Button>
                  </Col>
                  <Col xs='12' md='6' className='d-flex justify-content-center'>
                    <Button action={handleDelete}>Delete</Button>
                  </Col>
                </Row>
              )}
            </div>
          </div>

          {/* Sekcja sprzedawcy z zabezpieczeniem przed brakiem danych w ad.user */}
          <div className={styles.body}>
            <h3>Seller</h3>
            <div className={styles.userBox}>
              <div className={styles.imgBox}>
                <img 
                  src={IMGS_URL + (ad.user?.avatar || 'blankprofile.jpg')} 
                  className={styles.avatar} 
                  alt='user avatar'
                  onError={(e) => {
                    e.currentTarget.src = IMGS_URL + 'blankprofile.jpg';
                  }}
                /> 
              </div>
              <div className={styles.userInfo}>
                <h4>{ad.user?.login || 'Unknown'}</h4>
                {ad.user?.phone && (
                  <h4>
                    <FontAwesomeIcon className={styles.phoneIcon} icon={faPhone} /> {ad.user.phone}
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Ad;