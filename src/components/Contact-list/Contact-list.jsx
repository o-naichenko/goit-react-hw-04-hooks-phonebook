import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact-list.module.css';
import Contact from '../Contact';

const ContactList = ({ contacts, onClick }) => {
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <Contact key={contact.id} contact={contact} onClick={onClick} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactList;
