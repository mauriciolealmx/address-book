import React, { Component } from 'react';
import axios from 'axios';
import capitalize from 'lodash/capitalize';
import { style } from 'typestyle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getUserContacts } from './GetUsers';

const styles = {
  textField: {
    root: style({
      marginLeft: '20px',
    }),
  },

  button: style({
    display: 'block',
    margin: 'auto',
  }),
};

function createContact(userId, contact) {
  return axios
    .post(`/users/${userId}/contacts`, contact)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to create contact for ${userId}`, err.message);
    });
}

const initialState = {
  contactEmail: '',
  contactLastName: '',
  contactName: '',
};

export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      feedbackMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { contactName, contactLastName, contactEmail } = this.state;
    const { userJwtToken, userId, updateContacts } = this.props;

    const contact = {
      email: contactEmail.toLowerCase(),
      firstName: capitalize(contactName),
      lastName: capitalize(contactLastName),
      token: userJwtToken,
    };

    createContact(userId, contact).then(contact => {
      const { firstName } = contact;
      const feedbackMessage = `User ${firstName} was added to ${userId}`;

      getUserContacts(userJwtToken, userId).then(res => {
        updateContacts(res);
        this.setState({
          ...initialState,
        });
      });

      this.setState({
        feedbackMessage,
      });
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const { feedbackMessage } = this.state;
    return (
      <div>
        <form>
          <TextField
            classes={styles.textField}
            label="Name"
            margin="normal"
            onChange={event => this.handleChange('contactName', event)}
            value={this.state.contactName}
          />
          <TextField
            classes={styles.textField}
            label="Last Name"
            margin="normal"
            onChange={event => this.handleChange('contactLastName', event)}
            value={this.state.contactLastName}
          />
          <TextField
            classes={styles.textField}
            label="Email Address"
            margin="normal"
            onChange={event => this.handleChange('contactEmail', event)}
            value={this.state.contactEmail}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" className={styles.button}>
            Create Contact
          </Button>
        </form>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </div>
    );
  }
}
