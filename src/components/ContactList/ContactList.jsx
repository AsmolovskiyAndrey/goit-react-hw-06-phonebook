import css from './ContactsList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteMyContact,
  getContacts,
  getFilter,
} from 'components/redux/contactSlice';

export const ContactList = () => {
  const myContacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const normalized = filter.toLowerCase();
    return myContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  return (
    <ul>
      {getVisibleContacts().map(({ id, name, number }) => (
        <li className={css.list} key={id}>
          {name}: {number}
          <button
            className={css.btn}
            onClick={() => dispatch(deleteMyContact(id))}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};
