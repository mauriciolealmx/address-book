import React, { Component } from 'react';
import capitalize from 'lodash/capitalize';
import { style } from 'typestyle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { deleteContact, getUserContacts } from '../services';

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

const initialState = {
  contactLastName: '',
  contactName: '',
  feedbackMessage: '',
};

export default class DeleteContact extends Component {
  state = { ...initialState };

  handleSubmit = async () => {
    const { contactName, contactLastName } = this.state;
    const { userId } = this.props;

    const contact = {
      firstName: capitalize(contactName),
      lastName: capitalize(contactLastName),
    };

    const resp = await deleteContact(userId, contact);
    if (!resp) {
      this.setState({
        feedbackMessage: 'Contact does not exist.',
      });
      return;
    }

    const contacts = await getUserContacts(userId);
    this.setState({
      ...initialState,
    });
    this.updateAppState(contacts);
  }

  updateAppState = contacts => {
    const { updateContacts } = this.props;
    updateContacts(contacts);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const { contactLastName, contactName, feedbackMessage } = this.state;
    return (
      <div>
        <form>
          <TextField
            classes={styles.textField}
            label="Name"
            margin="normal"
            onChange={event => this.handleChange('contactName', event)}
            value={contactName}
          />
          <TextField
            classes={styles.textField}
            label="Last Name"
            margin="normal"
            onChange={event => this.handleChange('contactLastName', event)}
            value={contactLastName}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" className={styles.button}>
            Delete Contact
          </Button>
        </form>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </div>
    );
  }
}
