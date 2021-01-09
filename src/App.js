import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./App.module.css";
import ContactForm from "./components/Contact-form";
import Filter from "./components/Filter";
import ContactList from "./components/Contact-list";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  static propTypes = {
    value: PropTypes.string,
    newContact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  };
  addContact = (newContact) => {
    if (this.checkContactUniqueness(newContact)) {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };
  checkContactUniqueness(newContact) {
    return this.state.contacts.every(
      (contact) => contact.name.toLowerCase() !== newContact.name.toLowerCase()
    );
  }
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }
  deleteContact = (e) => {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== e.currentTarget.id
    );
    this.setState({
      contacts: filteredContacts,
    });
  };
  filterContacts = () => {
    const { filter, contacts } = this.state;
    if (filter.length === 0) {
      return contacts;
    } else {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };
  setFilterValue = (value) => this.setState({ filter: value });
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={s.App}>
        <h1 className={s.header}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={s.header}>Contacts</h2>
        <Filter onChange={this.setFilterValue} />
        <ContactList
          contacts={filter.length === 0 ? contacts : this.filterContacts()}
          onClick={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
