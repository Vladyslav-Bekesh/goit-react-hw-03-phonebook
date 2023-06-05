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

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const { name, number } = data;

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
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        {this.state.contacts !== 0 && (
          <ContactForm onSubmit={this.formSubmitHandler} />
        )}

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          contacts={this.state.contacts}
          handleFilterChange={this.handleFilterChange}
        />

        {this.state.contacts.length !== 0 && this.state.filter === '' ? (
          <Contacts
            contacts={this.state.contacts}
            onClick={this.handleDelete}
          />
        ) : (
          <Contacts contacts={this.makeFilteredContacts()} />
        )}
      </>
    );
  }
}

export default App;
