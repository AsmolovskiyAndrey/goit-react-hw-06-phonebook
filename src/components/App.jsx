// import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { addMyContact } from './redux/contactSlice';

export const App = () => {
  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem('contacts')) ?? [];
  // });
  const myContacts = useSelector(state => state.phoneBook.contacts);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = data => {
    const { name, number } = data;
    if (checkDoubleContact(data)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addMyContact(newContact));
  };

  const checkDoubleContact = inputData => {
    return myContacts.find(contact => contact.name === inputData.name);
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>My Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </>
  );
};
