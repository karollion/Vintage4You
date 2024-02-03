//import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { getIsLoading } from '../../../redux/isLoadingRedux';
import { getAllAds } from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import AllAds from '../../features/AllAds/AllAds';
import Container from '../../common/container/Container'

const Home = () => {
  const ads = useSelector(state => getAllAds(state));
  const isLoading = useSelector(state => getIsLoading(state));

  return (
    <div className='min-vh-100'>
      <SearchForm />
      <Container>
        <h2 className='my-4' >All Ads</h2>
        {ads.length === 0 && !isLoading && <p>No advertisements</p>}
        {isLoading && <Spinner animation='border' variant='primary' />}
        {!isLoading && <AllAds />}
      </Container>
    </div>
  );
};

export default Home;