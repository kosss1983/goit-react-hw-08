import ContactForm from '../components/ContactForm/ContactForm';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Loader from '../components/Loader/Loader';
import { selectIsError, selectIsLoading } from '../redux/contacts/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contacts/operations';

export default function ContactsPage() {
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <div className="formBox">
        <ContactForm />
        <SearchBox />
      </div>
      {!isError && <ContactList />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
}
