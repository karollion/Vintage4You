import styles from './DeleteAd.module.scss';
import { Alert, Row, Col } from "react-bootstrap";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { removeAdRequest, getAdById } from "../../../redux/adsRedux";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  {id}  = useParams();

  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  const handleClick = e => {
    e.preventDefault();
    navigate("/ad/" + id);
  }
  
  const handleAction = e => {
    e.preventDefault();
    dispatch(removeAdRequest(id));
    navigate('/');
  };

  if (!ad) return <Navigate to="/" />;
  if (user.user.id !== ad.user._id) return <Navigate to="/" />;

  return (
    <div className={styles.root}>
      <div className={styles.vaves}></div> 
      <Title>Delete Ad</Title>
      <div className={styles.body}>
        <Alert variant='danger'>
            <Alert.Heading>Are you sure?</Alert.Heading>
            <p>Do you want to permanently delete this advertisement?</p>
        </Alert>
        <Row className="d-flex justify-content-center mt-3">
          <Col  className='d-flex justify-content-center'>
            <Button className="w-100 p-3" action={handleClick}>NO</Button>
          </Col>
          <Col  className='d-flex justify-content-center'>
            <Button className="w-100 p-3" action={handleAction}>YES</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeleteAd;