import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import s from "./App.module.css";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    if (checkContactUniqueness(newContact)) {
      setContacts((state) => [newContact, ...state]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };
  const checkContactUniqueness = (newContact) => {
    return contacts.every(
      (contact) => contact.name.toLowerCase() !== newContact.name.toLowerCase()
    );
  };

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (e) => {
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== e.currentTarget.id
    );
    setContacts(filteredContacts);
  };

  const filterContacts = () => {
    if (filter.length === 0) {
      return contacts;
    } else {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };
  const setFilterValue = (value) => setFilter(value);
  return (
    <div className={s.App}>
      <h1 className={s.header}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={s.header}>Contacts</h2>
      <Filter onChange={setFilterValue} />
      <ContactList contacts={filterContacts()} onClick={deleteContact} />
    </div>
  );
}

App.propTypes = {
  value: PropTypes.string,
  newContact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
