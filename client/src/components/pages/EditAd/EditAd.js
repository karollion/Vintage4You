import styles from './EditAd.module.scss';
import EditAdForm from '../../features/EditAdForm/EditAdForm';

const EditAd = () => {
  return (
    <div className='min-vh-100' >
      <div className={styles.vaves}></div> 
      <h2 className='my-4' >Edit Advertisement</h2>
      <EditAdForm />
    </div>
  );
};

export default EditAd;