import { addContact } from '../helpers/firebase-querys';

// TODO: User B should not be able to create contacts with user's A jwt Token.
const create = (req, res) => {
  let { userId } = req.params;
  let { firstName, lastName, email } = req.body;
  addContact(userId, { firstName, lastName, email })
    .then(response => {
      if (response) {
        return res.status(201).send(response);
      } else {
        return res.status(404).send('Not Found');
      }
    })
    .catch(err => {
      if (err) {
        return res.status(404).send(err);
      }
    });
};

export { create };
