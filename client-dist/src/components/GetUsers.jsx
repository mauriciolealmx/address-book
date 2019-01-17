import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import Contacts from './Contacts/Contacts';
import { getUserContacts } from '../services';

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
