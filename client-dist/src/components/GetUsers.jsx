import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import Contacts from './Contacts/Contacts';

export function getUserContacts(userJwtToken, userId) {
  return axios
    .get(`/users/${userId}/contacts?token=${userJwtToken}`)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to get contact for ${userId}`, err.message);
    });
}

export default class GetUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userContacts: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { userJwtToken, userId } = this.props;
    getUserContacts(userJwtToken, userId).then(res => {
      this.setState({
        userContacts: res.data,
      });
    });
  }
  
  render() {
    const { userContacts } = this.state;
    return (
      <div>
        <Button
          color="primary"
          onClick={this.handleSubmit}
          variant="outlined"
          style={{
            display: 'block',
            margin: 'auto',
          }}
        >
          Get Contacts
        </Button>
        {userContacts && <Contacts contacts={userContacts} />}
      </div>
    );
  }
}
