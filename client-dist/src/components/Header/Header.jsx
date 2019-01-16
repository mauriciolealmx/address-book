import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { styles } from './Header.styles';

function ButtonAppBar(props) {
  const { userId } = props;
  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          {props.isLoggedIn && <Button color="inherit">=</Button>}
          <Typography variant="h6" color="inherit" style={styles.grow}>
            Address Book
          </Typography>
          {props.isLoggedIn && (
            <div>
              <Button onClick={props.logOut} color="inherit">
                {'Logout'}
              </Button>
              <Button color="inherit">{userId}</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
