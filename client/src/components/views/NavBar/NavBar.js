import styles from './NavBar.module.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { IMGS_URL } from '../../../config';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.root}>
      <Container>
        <Navbar variant="dark" expand="lg" className=''>
            <Navbar.Brand className={styles.logo} as={NavLink} to="/">Vintage4You</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/">Home</NavLink>
                {user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/ad/addAd">Add Ad</NavLink>) : null }
                {!user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/login">Login</NavLink>) : null }
                {!user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/signup">Sign up</NavLink>) : null }
                {user ? (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/logout">Logout</NavLink>) : null }
              </Nav>
              {user &&  (
              <div className={styles.avatarBox}>
                <img src={IMGS_URL + user.user.avatar} className={styles.avatar} alt='avatar'></img>
              </div>)}
            </Navbar.Collapse>
        </Navbar>
      </Container> 
    </div>
  );
};

export default NavBar;