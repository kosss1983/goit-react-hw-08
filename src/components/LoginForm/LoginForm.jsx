import { Formik, Form, Field } from 'formik';
import s from './LoginForm.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values, options) => {
    dispatch(login(values))
      .unwrap()
      .catch(e => {
        switch (e) {
          case 400:
            toast.error('Login error!');
            break;
          default:
            toast.error('Something went wrong!');
        }
      });
    options.resetForm();
  };

  const orderSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });
  return (
    <>
      <Formik
        validationSchema={orderSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label>
            <span>Email</span>
            <Field name="email" type="email" />
          </label>
          <label>
            <span>Password</span>
            <Field name="password" type="password" />
          </label>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default LoginForm;
