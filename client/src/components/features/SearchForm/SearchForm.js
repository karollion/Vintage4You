import styles from './SearchForm.module.scss';
import { Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Container from '../../common/container/Container';
import Button from '../../common/Button/Button';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchPhase, setSearchPhase] = useState('');
 

  const handleSubmit = e => {
    e.preventDefault()
    let adress = '/searchedAd/' + searchPhase;
    navigate(adress);
  };
  
  return (
    <div className={styles.root}>
      <Container>
        <Form onSubmit={handleSubmit} className={styles.form}>

          <input
            className="form-control"
            value={searchPhase}
            onChange={(e) => setSearchPhase(e.target.value)}
            type="search"
            placeholder="Search ad"
          />
          
          <Button type="submit">Search</Button>
        </Form>
      </Container>
      <div className={styles.vaves}></div> 
    </div>
  );
};

export default SearchForm;