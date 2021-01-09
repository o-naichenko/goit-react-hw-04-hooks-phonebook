import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.css';

const Contact = ({ contact, onClick }) => {
  return (
    <li className={s.item}>
      <p className={s.text}>{contact.name + ': ' + contact.number}</p>
      <button
        className={s.deleteBtn}
        type="button"
        id={contact.id}
        onClick={onClick}
      >
        Delete
      </button>
    </li>
  );
};
Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
export default Contact;
