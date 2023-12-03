import styles from './AdCard.module.scss';
import { Link } from 'react-router-dom';
import { Card, Col, Button } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';

const AdCard = ({ ad }) => {

  return (
    <Col xs='12' md='6' lg='4' className='mb-4'>
      <Card className='p-3'>
        <div className={styles.imageBox}>
          <img 
            className={styles.image}
            alt={ad.title}
            src={ IMGS_URL + ad.picture } />
        </div>
        <p className='mt-3'><span className='fw-bold'>{ad.title}</span></p>
        <p className='mt-3'>{ad.location}</p>
        
        <Button variant="primary" as={Link} to={"/ad/" + ad._id}>Read more</Button>
      </Card>
    </Col>
  );
};

export default AdCard;