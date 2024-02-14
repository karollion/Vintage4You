import styles from './EditAd.module.scss';
import EditAdForm from '../../features/EditAdForm/EditAdForm';
import Title from '../../common/Title/Title';

const EditAd = () => {
  return (
    <div className={styles.root}>
      <Title>Edit Ad</Title>
      <div className={styles.body}>
      <EditAdForm />
      </div>
    </div>
  );
};

export default EditAd;