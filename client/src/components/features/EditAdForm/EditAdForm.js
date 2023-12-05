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

  function getDate() {
    const today = new Date();
    return today;
  }
  const title = 'Edit ad'

  const handleSubmit = ad => {
    ad.date = getDate();
    dispatch(updateAdRequest(ad));
    navigate('/');
  };
  
  if (!adData) return <Navigate to="/" />;
  if (user.user.id === adData.user) return <Navigate to="/" />;
  
  return (
    <AdForm
      action={handleSubmit} 
      actionText='Edit ad' 
      title={adData.title}
      content={adData.content}
      picture={adData.picture}
      price={adData.price}
      location={adData.location}
      user={adData.user}
      pageTitle={title}
    />
  );
  
};

export default EditAdForm;