import { updateAdRequest, getAdById } from "../../../redux/adsRedux";
import { useNavigate, Navigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const EditAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const  {id}  = useParams();
  const adData = useSelector(state => getAdById(state, id));

  const title = 'Edit ad'

  const handleSubmit = ad => {
    dispatch(updateAdRequest(ad));
    navigate('/');
  };
  
  if (!adData) return <Navigate to="/" />;
  if (user === adData.seller) return <Navigate to="/" />;
  
  return (
    <AdForm
      action={handleSubmit} 
      actionText='Edit ad' 
      title={adData.title}
      content={adData.content}
      date={adData.date}
      picture={adData.picture}
      price={adData.price}
      location={adData.location}
      seller={adData.seller}
      pageTitle={title}
    />
  );
  
};

export default EditAdForm;