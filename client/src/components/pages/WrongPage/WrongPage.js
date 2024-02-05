import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import styles from './WrongPage.module.scss'
import Title from '../../common/Title/Title';

const WrongPage = () => {
  const navigate = useNavigate();

  const handleBack = e => {
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className={styles.root}>
      <div className={styles.vaves}></div> 
      <Title>404</Title>
      <h4>Oh no! It seems that the page you are looking for is hidden somewhere. Let's try to get back to our home page.</h4>
      <Button className={styles.btn} action={handleBack}>Back to home</Button>

    </div>
  );
};

export default WrongPage;