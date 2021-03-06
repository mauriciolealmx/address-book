import pgClient from '../helpers/postgres-querys';

export const removeUser = (req, res) => {
  pgClient.deleteUser(req.body.email, (err, data) => {
    // TODO: User needs to be be deleted from Firebase as well.
    let message;
    if (data) {
      message = `User with email: ${req.body.email} was deleted`;
    } else {
      message = `User with email: ${req.body.email} was not found`;
    }
    return res.status(202).send(message);
  });
};
