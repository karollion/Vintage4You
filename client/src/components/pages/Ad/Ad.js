import styles from './Ad.module.scss'
import { getAdById } from "../../../redux/adsRedux";
import { Navigate, Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { Button, Row, Col } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const Ad = () => {
  const user = useSelector(getUser);

  const  {id}  = useParams();
  const ad = useSelector(state => getAdById(state, id));
  console.log(ad)
  if (!ad) return <Navigate to="/" />;
  return (
    <div className='min-vh-100 px-4'>
      <h2 className='my-4' >Advertisement</h2>
      <Row>
        <Col xs='12' md='6' lg='6' className='p-3 border rounded'>
          <div className={styles.imageBox}>
            <img 
              className={styles.image}
              alt={ad.title}
              src={ IMGS_URL + ad.picture } />
          </div>
        </Col>
        <Col xs='12' md='6' lg='6' className='p-3'>
          <h3>{ad.title}</h3>
          <p><b>Published date / last edited: </b> {ad.date.substring(0, 10)}</p>
          <p><b>Price: </b>{ad.price}zł</p>
          <p><b>Location: </b>{ad.location}</p>
          <p><b>Ad content: </b></p>
          <p>{ad.content}</p>
          <Row>
            <Col>
              <p><b>Seller: </b>{ad.user}</p>
            </Col>
            <Col>
              {/* <div className={styles.imageUser}>
                <img 
                  className={styles.image}
                  alt={ad.user.login + ' picture'}
                  src={ IMGS_URL + ad.user.avatar } />
              </div> */}
            </Col>
          </Row>
          {user && user.user.id === ad.user && (
          <Row className="d-flex justify-content-center">
            <Col>
              <Button className="w-100 p-3" variant="primary" as={Link} to={"/ad/editAd/" + ad._id}>Edit</Button>
            </Col>
            <Col>
              <Button className="w-100 p-3" variant="danger" as={Link} to={"/ad/deleteAd/" + ad._id}>Delete</Button>
            </Col>
          </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Ad;