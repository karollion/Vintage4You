import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { getIsLoading } from '../../../redux/isLoadingRedux';
import { getAllAds } from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import AllAds from '../../features/AllAds/AllAds';
import Container from '../../common/container/Container'
import Title from '../../common/Title/Title';

const Home = () => {
  const ads = useSelector(state => getAllAds(state));
  const isLoading = useSelector(state => getIsLoading(state));

  return (
    <div className={styles.root}>
      <SearchForm />
      <Container>
        <div className={styles.content}>
          <Title>All ads</Title>
          {ads.length === 0 && !isLoading && <p>No advertisements</p>}
          {isLoading && <Spinner animation='border' variant='primary' />}
          {!isLoading && <AllAds />}
        </div>
      </Container>
    </div>
  );
};

export default Home;