import { deleteUser } from '../helpers/postgres-querys';

export const removeUser = (req, res) => {
  deleteUser(req.body.email).then(data => {
    let message;
    if (data) {
      message = `User with email: ${req.body.email} was deleted`
    } else {
      message = `User with email: ${req.body.email} was not found`
    }
    return res.status(202).send(message);
  }).catch( err => {
    return res.status(400).send(err)
  });
};
