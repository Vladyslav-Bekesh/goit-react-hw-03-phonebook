import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  CONTACT_KEY = 'contacts';

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  componentDidMount() {
    this.setState({
      contacts: JSON.parse(localStorage.getItem(this.CONTACT_KEY)) ?? [],
    });
  }

  componentDidUpdate(prevProps, PrevState) {
    if (PrevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.CONTACT_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;

    const isDuplicate = contacts.some(contact => {
      if (contact.name === name && contact.number === number) {
        alert('This contact is already in contacts');
        return true;
      }
      return false;
    });

    if (!isDuplicate) {
      this.setState({
        contacts: [...contacts, { name, number, id: nanoid() }],
      });
    }
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    const newArray = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: newArray });
  };

  handleFilterChange = newFilter => {
    this.setState({ filter: newFilter });
  };

  makeFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts } = this.state;
    return (
      <>
        <h1>Phonebook</h1>
        {contacts !== 0 && <ContactForm onSubmit={this.formSubmitHandler} />}
        <h2>Contacts</h2>

        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />

        {contacts.length !== 0 && this.state.filter === '' ? (
          <Contacts contacts={contacts} onClick={this.handleDelete} />
        ) : (
          <Contacts contacts={this.makeFilteredContacts()} />
        )}
      </>
    );
  }
}

export default App;
