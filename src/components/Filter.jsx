import React, { Component } from 'react';

class Filter extends Component {
  state = {
    filteredContacts: [],
  };

  filteredContacts = () => {
    if (this.props.filter !== '') {
      const filteredContacts = this.props.contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .startsWith(this.props.filter.toLowerCase());
      });

      this.setState({ filteredContacts: filteredContacts });
    } else {
      this.setState({ filteredContacts: [] });
    }
  };

  onInputChange = event => {
    this.props.handleFilterChange(event.target.value);

    this.filteredContacts();
  };

  render() {
    return (
      <>
        <label>
          Enter name from contacts
          <input
            type="text"
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.props.filter}
            onChange={this.onInputChange}
            required
          />
        </label>
      </>
    );
  }
}

export default Filter;
