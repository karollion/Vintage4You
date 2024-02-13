import styles from './NavBar.module.scss'
import Container from '../../common/container/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { IMGS_URL } from '../../../config';
import { useState } from 'react';

const NavBar = () => {
  const user = useSelector(getUser);
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={styles.root}>
      <Container>
        <Navbar expanded={expanded} variant="dark" expand="lg" className={styles.navbar}>
            <Navbar.Brand className={styles.logo} as={NavLink} to="/">Vintage4You</Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink onClick={() => setExpanded(false)} className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/">Home</NavLink>
                {user ? (<NavLink onClick={() => setExpanded(false)} className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/ad/addAd">Add Ad</NavLink>) : null }
                {!user ? (<NavLink onClick={() => setExpanded(false)} className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/login">Login</NavLink>) : null }
                {!user ? (<NavLink onClick={() => setExpanded(false)} className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/signup">Sign up</NavLink>) : null }
                {user ? (<NavLink onClick={() => setExpanded(false)} className={({ isActive }) => isActive ? styles.linkActive : undefined} as={NavLink} to="/logout">Logout</NavLink>) : null }
              </Nav>
            </Navbar.Collapse>
              {user && user.user && (
              <div className={styles.avatarBox}>
                <img src={IMGS_URL + user.user.avatar} className={styles.avatar} alt='avatar'></img>
              </div>)}
        </Navbar>
      </Container>
      <div className={styles.vaves}></div> 
    </div>
  );
};

export default NavBar;