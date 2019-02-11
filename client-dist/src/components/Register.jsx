import React, { Component } from 'react';

import ActionForm from './ActionFrom';
import { createAccount } from '../services';

const initialState = {
  serverError: '',
  successMessage: '',
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleSubmit = async user => {
    const { email } = await createAccount(user);
    this.setState({
      ...initialState,
      successMessage: `Registered user ${email}`,
    });
    // TODO: Need to take error into account.
    // .catch(err => {
    //   const { data } = err.response;
    //   this.setState({
    //     serverError: data.error,
    //     successMessage: '',
    //   });
    // });
  };

  render() {
    const { serverError, successMessage } = this.state;
    const { alternativeButtonAction } = this.props;

    return (
      <div style={{ display: 'inline-block' }}>
        <ActionForm
          cardTitle="Create account"
          submitButtonText="Submit"
          onSubmit={this.handleSubmit2}
          alternativeButtonText="Sign In"
          alternativeButtonAction={alternativeButtonAction}
        />
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
