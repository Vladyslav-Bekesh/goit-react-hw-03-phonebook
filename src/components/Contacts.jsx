import React from 'react';
import PropTypes from 'prop-types';

function Contacts({ contacts, onClick }) {
  // console.log(this.props);
   return (
     <>
       <ul>
         {contacts.map(({ name, id, number }) => {
           return (
             <li key={id}>
               <span>
                 {name}: {number}
               </span>
               <button type="button" onClick={(e)=>{onClick(e,id)}}>
                 delete
               </button>
             </li>
           );
         })}
       </ul>
     </>
   );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Contacts;