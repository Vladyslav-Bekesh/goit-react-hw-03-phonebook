import React from 'react';

function Filter({handleFilterChange, filter})  {
    return (
      <>
        <label>
          Enter name from contacts
          <input
            type="text"
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={filter}
            onChange={event => {
              handleFilterChange(event.target.value);
            }}
            required
          />
        </label>
      </>
    );
  }


export default Filter;
