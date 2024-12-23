import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './RegistrationForm.module.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import toast, { Toaster } from 'react-hot-toast';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const handleSubmit = (values, options) => {
    dispatch(register(values))
      .unwrap()
      .catch(e => {
        switch (e) {
          case 400:
            toast.error('User creation error!');
            break;
          default:
            toast.error('Something went wrong!');
        }
      });
    options.resetForm();
  };

  const orderSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
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
            <span>Name</span>
            <Field name="name" />
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
          <label>
            <span>Email</span>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="span" className={s.error} />
          </label>
          <label>
            <span>Password</span>
            <Field name="password" type="password" />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </label>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default RegistrationForm;
