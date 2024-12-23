import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import toast, { Toaster } from 'react-hot-toast';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .catch(e => {
        switch (e) {
          case 401:
            toast.error('Missing header with authorization token!');
            break;
          default:
            toast.error('Something went wrong!');
        }
      });
  };

  return (
    <div className={s.wrapper}>
      <p>
        <span className={s.welcome}>Welcome</span>,&nbsp;&nbsp;
        <span className={s.user}>{user.name}</span>
      </p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <Toaster />
    </div>
  );
};
