import styles from './AdCard.module.scss';
import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import PropTypes from 'prop-types'

const AdCard = ({ ad }) => {

  return (
    <Col xs='12' md='6' lg='4' className='mb-4'>
      <div className={styles.card}>
        <img variant='top' alt='ad_image' src={IMGS_URL + ad.picture} className={styles.img} />
			  <div className={styles.body}>
          <h3>{ad.title}</h3>
          <p>Location: {ad.location}</p>
          <p>Date added: {ad.date.substring(0, 10)}</p>
          <Button variant="primary" as={Link} to={"/ad/" + ad._id}>Read more</Button>
        </div>
      </div>
    </Col>
  );
};

AdCard.propTypes = {
	ad: PropTypes.object.isRequired,
}

export default AdCard;