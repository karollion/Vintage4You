import styles from './AdForm.module.scss';
import { Col, Form, Row } from "react-bootstrap";
import Button from "../../common/Button/Button";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

const AdForm = ({ action, actionText, ...props }) => {
  const navigate = useNavigate();
  const  {id}  = useParams();

  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [picture, setPicture] = useState(props.picture || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [user] = useState(props.user);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    if(content ) {
      action({ title, content, picture, price, location, user });
    }
  };

  const handleBack = e => {
    e.preventDefault();
    navigate("/ad/" + id);
  }
  
  return (
    <Form onSubmit={validate(handleSubmit)} className={styles.root}>
      <p></p>

      <Form.Group  controlId="formtitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register("title", { required: true, minLength: 10, maxLength: 50 })}
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text' placeholder='Enter title (10 to 50 characters)'
        />
        {errors.title && <small className="d-block form-text text-danger mt-2">Title length is incorrect (min is 10, max is 50)</small>}
      </Form.Group>

      <Form.Group  controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control 
          {...register("content", { required: true, minLength: 20, maxLength: 1000 })}
          as="textarea" placeholder="Enter content (20 to 1000 characters)" rows={3} 
          value={content} 
          onChange={e => setContent(e.target.value)} />
          {errors.content && <small className="d-block form-text text-danger mt-2">Content length is incorrect (min is 20, max is 1000)</small>}
      </Form.Group>

      <Form.Group  controlId="formpicture">
        <Form.Label>Picture</Form.Label>
        <Form.Control
          {...register("picture", { required: false })}
          
          onChange={e => setPicture(e.target.files[0])}
          type='file'
        />
        {errors.picture && <small className="d-block form-text text-danger mt-2">Picture can't be empty</small>}
      </Form.Group>

      <Form.Group  controlId="formprice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register("price", { required: true })}
          value={price}
          onChange={e => setPrice(e.target.value)}
          type='text' placeholder='Enter price'
        />
        {errors.price && <small className="d-block form-text text-danger mt-2">Price can't be empty</small>}
      </Form.Group>

      <Form.Group  controlId="formlocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          {...register("location", { required: true })}
          value={location}
          onChange={e => setLocation(e.target.value)}
          type='text' placeholder='Enter location'
        />
        {errors.location && <small className="d-block form-text text-danger mt-2">Location can't be empty</small>}
      </Form.Group>

      <Row className="d-flex justify-content-center mt-3">
        {id ? <Col  xs='12' md='6' className='d-flex justify-content-center'>
          <Button action={handleBack}>Back</Button>
          
        </Col> : null}
        <Col   xs='12' md='6' className='d-flex justify-content-center'>
          <Button  type="submit">{actionText}</Button>
        </Col>
      </Row>
      
    </Form>
  );
};

export default AdForm;