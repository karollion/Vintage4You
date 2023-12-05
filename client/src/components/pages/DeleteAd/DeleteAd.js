import { Alert, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { removeAdRequest, getAdById } from "../../../redux/adsRedux";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  {id}  = useParams();

  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  
  const handleAction = e => {
    e.preventDefault();
    dispatch(removeAdRequest(id));
    navigate('/');
  };

  if (!ad) return <Navigate to="/" />;
  if (user.user.id !== ad.user._id) return <Navigate to="/" />;

  return (
    <div className='col-12 col-sm-3 mx-auto min-vh-100'>
      <h2 className='my-4' >Delete Advertisement</h2>
      <Alert variant='danger'>
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>Do you want to permanently delete this advertisements?</p>
      </Alert>
      <Row className="d-flex justify-content-center">
        <Col>
          <Button className="w-100 p-3" variant="secondary" as={Link} to={"/ad/" + id}>NO</Button>
        </Col>
        <Col>
          <Button className="w-100 p-3" variant="danger" onClick={handleAction}>YES</Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteAd;