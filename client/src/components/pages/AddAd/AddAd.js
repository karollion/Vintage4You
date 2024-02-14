import styles from './AddAd.module.scss';
import AddAdForm from '../../features/AddAdForm/AddAdForm';
import Title from '../../common/Title/Title';

const AddAd = () => {
  return (
    <div className={styles.root}>
      <Title>Add new ad</Title>
      <div className={styles.body}>
        <AddAdForm />
      </div>
    </div>
  );
};

export default AddAd;