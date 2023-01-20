import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
    setContacts(prevState => [newContact, ...prevState]);
  };

  const checkDoubleContact = inputData => {
    return contacts.find(contact => contact.name === inputData.name);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
  };

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilter={handleInputChange} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

// import React, { Component } from 'react';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';
// import { nanoid } from 'nanoid';

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     // console.log('App componentDidMount');
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('App componentDidUpdate');
//     if (this.state.contacts !== prevState.contacts) {
//       // console.log('Обновлено поле contacts');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = data => {
//     const { name, number } = data;
//     if (this.checkDoubleContact(data)) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   checkDoubleContact = inputData => {
//     return this.state.contacts.find(contact => contact.name === inputData.name);
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(el => el.id !== id),
//     }));
//   };

//   handleInputChange = e => {
//     this.setState({
//       [e.currentTarget.name]: e.currentTarget.value,
//     });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalized = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalized)
//     );
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />

//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onFilter={this.handleInputChange} />
//         <ContactList
//           contacts={visibleContacts}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
