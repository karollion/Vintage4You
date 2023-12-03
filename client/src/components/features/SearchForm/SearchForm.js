import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchPhase, setSearchPhase] = useState('');
 
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = ad => {
    let adress = '/searchedAd/' + searchPhase;
    navigate(adress);
  };
  
  return (
    <Form onSubmit={validate(handleSubmit)} className="d-flex justify-content-end">
      <Row className="">
        <Col>
          <Form.Group className="mb-3" controlId="formSearchPhase">
            <Form.Control
              {...register("searchPhase", { required: true })}
              value={searchPhase}
              onChange={e => setSearchPhase(e.target.value)}
              type='text' placeholder='Search ad'
            />
            {errors.searchPhase && <small className="d-block form-text text-danger mt-2">Search phase can't be empty</small>}
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;