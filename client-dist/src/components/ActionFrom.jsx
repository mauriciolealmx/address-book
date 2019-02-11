import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import styles from '../App.styles';

// TODO: email validation.
// const isValidEmail = email => {
//   const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return regex.test(email);
// };

export default class ActionForm extends Component {
  state = { email: '', password: '' };

  handleChange = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ email, password });
    // TODO: Validate input.
    // if (!isValidEmail(email)) {
    //   this.setState({
    //     isValidEmail: false,
    //   });
    //   return;
    // }
  };

  render() {
    const { email, password } = this.state;
    const { cardTitle, submitButtonText, alternativeButtonText, alternativeButtonAction } = this.props;

    return (
      <Paper classes={{ root: styles.root }}>
        <Typography component="h1" variant="h5" style={{ padding: '35px' }}>
          {cardTitle}
        </Typography>
        <form>
          <TextField
            autoComplete="email"
            fullWidth
            label="Email"
            margin="normal"
            onChange={event => this.handleChange('email', event)}
            type="email"
            value={email}
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label="Password"
            margin="normal"
            onChange={event => this.handleChange('password', event)}
            type="password"
            value={password}
          />
          <Button color="primary" fullWidth onClick={this.handleSubmit} variant="outlined">
            {submitButtonText}
          </Button>
        </form>
        <CardContent>
          <Button onClick={alternativeButtonAction} color="primary">
            {alternativeButtonText}
          </Button>
        </CardContent>
      </Paper>
    );
  }
}
