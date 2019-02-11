import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import Contacts from './components/Contacts/Contacts';
import CreateContact from './components/CreateContact';
import DeleteContact from './components/DeleteContact';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const initialState = {
  userContacts: [],
  userId: '',
  signIn: true,
};

export default class App extends Component {
  constructor() {
    super();
    this.state = cloneDeep(initialState);
  }

  updateUserId = userId => {
    this.setState({
      userId,
    });
  }

  updateContacts = userContacts => {
    this.setState({
      userContacts,
    });
  }

  isLoggedIn = () => {
    const { userId } = this.state;
    return !!userId;
  }

  logOut = () => {
    this.setState(cloneDeep(initialState));
  }

  createSignInToggle = () => {
    this.setState(prevState => ({ signIn: !prevState.signIn }));
  }

  render() {
    const { userId, userContacts, signIn } = this.state;
    const hasContacts = userContacts.length > 0;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div className="App">
        <Header userId={userId} isLoggedIn={this.isLoggedIn()} logOut={this.logOut} />
        <div className="App-header">
          {isLoggedIn ? (
            <React.Fragment>
              <CreateContact userId={userId} updateContacts={this.updateContacts} />
              <DeleteContact userId={userId} updateContacts={this.updateContacts} />
            </React.Fragment>
          ) : signIn ? (
            <Login
              updateUserId={this.updateUserId}
              updateContacts={this.updateContacts}
              alternativeButtonAction={this.createSignInToggle}
            />
          ) : (
            <Register alternativeButtonAction={this.createSignInToggle} />
          )}
          <hr />
          {hasContacts && <Contacts contacts={userContacts} />}
        </div>
      </div>
    );
  }
}
