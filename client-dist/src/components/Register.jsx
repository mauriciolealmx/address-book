import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { createAccount } from '../services';

const initialState = {
  email: '',
  password: '',
  serverError: '',
  successMessage: '',
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit() {
    const { email, password } = this.state;
    const user = { email, password };

    createAccount(user)
      .then(user => {
        const { email } = user;
        this.setState({
          ...initialState,
          successMessage: `Registered user ${email}`,
        });
      })
      .catch(err => {
        const { data } = err.response;
        this.setState({
          serverError: data.error,
          successMessage: '',
        });
      });
  }

  render() {
    const { serverError, successMessage } = this.state;

    return (
      <div style={{ display: 'inline-block' }}>
        <form noValidate autoComplete="off">
          <TextField
            autoComplete="email"
            fullWidth
            label="Email"
            margin="normal"
            onChange={event => this.handleChange('email', event)}
            value={this.state.email}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            onChange={event => this.handleChange('password', event)}
            type="password"
            value={this.state.password}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" fullWidth>
            Submit
          </Button>
        </form>
        {serverError && <div>{serverError}</div>}
        {successMessage && (
          <div>
            <div>Thanks for registering</div>
            <div>{successMessage}</div>
          </div>
        )}
      </div>
    );
  }
}
