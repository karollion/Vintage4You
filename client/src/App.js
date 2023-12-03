import { Routes, Route } from 'react-router-dom';
import { isUserLoginedIn } from './redux/usersRedux';
import { fetchAds } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from './components/common/container/Container';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';

// Import pages
import Home from './components/pages/Home/Home';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import DeleteAd from './components/pages/DeleteAd/DeleteAd';
import Ad from './components/pages/Ad/Ad';
import SearchedAd from './components/pages/SearchedAd/SearchedAd';
import Login from './components/pages/Login/Login';
import SignUp from './components/pages/SignUp/SignUp';
import Logout from './components/pages/Logout/Logout';
import WrongPage from './components/pages/WrongPage/WrongPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(isUserLoginedIn()), [dispatch]);
  useEffect(() => dispatch(fetchAds()), [dispatch]);

  return (
    <div>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ad/:id" element={<Ad/>} />
          <Route path="/ad/addAd" element={<AddAd/>} />
          <Route path="/ad/editAd/:id" element={<EditAd/>} />
          <Route path="/ad/deleteAd/:id" element={<DeleteAd/>} />
          <Route path="/searchedAd/:searchPhase" element={<SearchedAd/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<WrongPage/>} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
