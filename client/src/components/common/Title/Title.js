import styles from './Title.module.scss';

const Title = props => {
  return (
    <h2 className={styles.title}>{props.children}</h2>
  );
};

export default Title;