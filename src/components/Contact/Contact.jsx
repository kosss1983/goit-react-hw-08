import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import s from './Contact.module.css';
import { deleteContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully!');
      });
  };
  return (
    <div className={s.wrapper}>
      <div className={s.contact}>
        <div>
          <FaUser />
          <span>{name}</span>
        </div>
        <div>
          <FaPhone />
          <span>{number}</span>
        </div>
      </div>
      <div className={s.deleteWrap}>
        <button onClick={handleSubmit} className={s.deleteBtn}>
          Delete
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Contact;
