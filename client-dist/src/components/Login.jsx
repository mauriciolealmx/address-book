import React, { Component } from 'react';
import capitalize from 'lodash/capitalize';

import ActionForm from './ActionForm/ActionForm';
import { getUserContacts, login } from '../services';

const getEmailId = email => email.split('@')[0];

// FIXME: This works well but I could have a config object
// that has all the information.
// Like so THINK ABOUT IT:
// const actionFromConfig = {
//   login: {
//     cardTitle: 'Sign in',
//     submitButtonText: 'Sign in',
//     altButtonText: 'Create account',
//   },
// };

export default class CreateContact extends Component {
  handleSubmit = async user => {
    const { email } = await login(user);

    const userId = capitalize(getEmailId(email));
    const contacts = await getUserContacts(userId);

    this.updateAppState(contacts, userId);
    // TODO: Need the error message.
    // console.error(`Unable to login user ${user.email}`, err.message);
  };

  updateAppState = (contacts, userId) => {
    const { updateUserId, updateContacts } = this.props;
    updateContacts(contacts);
    updateUserId(userId);
  };

  render() {
    // const { successMessage } = this.state;
    const { alternativeButtonAction } = this.props;
    return (
      <div>
        <ActionForm
          cardTitle="Sign in"
          submitButtonText="Sign in"
          onSubmit={this.handleSubmit}
          alternativeButtonText="Create account"
          alternativeButtonAction={alternativeButtonAction}
        />
        {/* {successMessage && <div>{successMessage}</div>}
        {!this.state.isValidEmail && <div>Please Enter a valid Email address</div>} */}
      </div>
    );
  }
}
