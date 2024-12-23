import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export const AuthNav = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </div>
  );
};
