import styles from './Login.module.scss'
import { Alert, Spinner, Form } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from "react-router-dom";
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); //null, 'loading', 'success', 'serverError', 'clientError'

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      
      .then(res => {
        if(res.status === 200) {
          setStatus('success');
          setTimeout(() => { navigate('/') }, 1500);
          return res.json();
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 401) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .then(user => {
        dispatch(logIn({ user }));
      })
      .catch(err => {
        setStatus('serverError');
      })
  };
  return (
    <div className={styles.root}>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit} className={styles.card}> 

        {status === 'success' && (
          <Alert variant='success'>
            <Alert.Heading>Succes!</Alert.Heading>
            <p>You have been successfully logined in!</p>
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='danger'>
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect...</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation='border' role='status' className='block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}

        <Form.Group className='mb-3' controlId='formLogin'>
          <Form.Label>Login</Form.Label>
          <Form.Control 
            type='text' 
            value={login} 
            onChange={e => setLogin(e.target.value)} 
            placeholder='Enter login' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder='Enter password' />
        </Form.Group>
        <div className={styles.buttonBox}>
          <Button type='submit' >Sign in</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;