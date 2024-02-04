import styles from './Ad.module.scss'
import { getAdById } from "../../../redux/adsRedux";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import { IMGS_URL } from '../../../config';
import Container from '../../common/container/Container';

const Ad = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const  {id}  = useParams();
  const ad = useSelector(state => getAdById(state, id));

  const handleBack = e => {
    e.preventDefault();
    navigate('/');
  }

  const handleEdit = e => {
    e.preventDefault();
    navigate("/ad/editAd/" + ad._id);
  }

  const handleDelete = e => {
    e.preventDefault();
    navigate("/ad/deleteAd/" + ad._id);
  }
  
  if (!ad) return <Navigate to="/" />;
  return (
    <div className={styles.root}>
      <div className={styles.vaves}></div> 
      <Container>
        <div className={styles.box}>
          <Button className={styles.btn} action={handleBack}>Back to home</Button>
          <div className={styles.body}>
            <img variant='top' src={IMGS_URL + ad.picture} alt={ad.title} className={styles.img} />
            <div className={styles.adBoxs}>
              <h3>{ad.title}</h3>
                <p className={styles.price}>{ad.price}$</p>
                <p><span>Location: </span>{ad.location}</p>
                <p><span>Published date / last edited: </span>{ad.date.substring(0, 10)}</p>
                <p><span>Description:</span></p>
                <p>{ad.content}</p>
                
                {user && user.user.id === ad.user._id && (
                  <div className={styles.btnContaier}>
                    <Button className={styles.btn} action={handleEdit}>Edit</Button>
                    <Button className={styles.btn} action={handleDelete}>Delete</Button>
                  </div>
                )}
            </div>
          </div>
          <div className={styles.body}>
            <h3>Seller</h3>
            <div className={styles.userBox}>
              <div className={styles.imgBox}>
                <img src={IMGS_URL + ad.user.avatar} className={styles.avatar} alt='user avatar'></img> 
              </div>
              <div className={styles.userInfo}>
                <h4>{ad.user.login}</h4>
                <h4>Phone:</h4>
                <h4>{ad.user.phone}</h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Ad;