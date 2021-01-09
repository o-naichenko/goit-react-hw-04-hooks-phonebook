import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

class Filter extends Component {
  state = {
    filter: '',
  };
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  onChangeHandler = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
    this.props.onChange(value);
  };
  render() {
    const { filter } = this.state;
    return (
      <label className={s.label}>
        <span>Find contacts by name</span>
        <input
          className={s.input}
          type="text"
          name="filter"
          value={filter}
          placeholder="Type name here"
          onChange={this.onChangeHandler}
        ></input>
      </label>
    );
  }
}

export default Filter;
