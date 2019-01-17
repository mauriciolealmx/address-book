import { addContact } from '../helpers/firebase-querys';

export const create = (req, res) =>
  addContact(req.params.userId, req.body)
    .then(response => {
      console.log(response)
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
