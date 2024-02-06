import styles from './AdCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Button from '../../common/Button/Button';
import { IMGS_URL } from '../../../config';
import PropTypes from 'prop-types'

const AdCard = ({ ad }) => {
  const navigate = useNavigate();

  const handleClick = e => {
    e.preventDefault();
    navigate("/ad/" + ad._id);
  }

  return (
    <Col xs='12' sm='6' md='4' lg='3' className='mb-4'>
      <div className={styles.card}>
        <div className={styles.price}><p>{ad.price}$</p></div>
        <img variant='top' alt='ad_image' src={IMGS_URL + ad.picture} className={styles.img} />
			  <div className={styles.body}>
          <h3>{ad.title}</h3>
          <p>Location: {ad.location}</p>
          <p>Date added: {ad.date.substring(0, 10)}</p>
          <div className={styles.buttonBox}>
            <Button variant="primary" action={handleClick}>Read more</Button>
          </div>
        </div>
      </div>
    </Col>
  );
};

AdCard.propTypes = {
	ad: PropTypes.object.isRequired,
}

export default AdCard;