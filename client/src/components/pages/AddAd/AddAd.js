import styles from './AddAd.module.scss';
import AddAdForm from '../../features/AddAdForm/AddAdForm';

const AddAd = () => {
  return (
    <div className='min-vh-100'>
      <div className={styles.vaves}></div> 
      <h2 className='my-4' >Add Advertisement</h2>
      <AddAdForm />
    </div>
  );
};

export default AddAd;