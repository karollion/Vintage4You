//import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import { getIsLoading } from '../../../redux/isLoadingRedux';
import { getAllAds } from '../../../redux/adsRedux';
import SearchForm from '../../features/SearchForm/SearchForm';
import AllAds from '../../features/AllAds/AllAds';

const Home = () => {
  const ads = useSelector(state => getAllAds(state));
  const isLoading = useSelector(state => getIsLoading(state));

  return (
    <div className='min-vh-100'>
      <Row className="">
        <Col>
          <h2 className='my-4' >All Advertisements</h2>
        </Col>
        <Col>
          <SearchForm />
        </Col>
      </Row>
      {ads.length === 0 && !isLoading && <p>No advertisements</p>}
      {isLoading && <Spinner animation='border' variant='primary' />}
      {!isLoading && <AllAds />}
    </div>
  );
};

export default Home;