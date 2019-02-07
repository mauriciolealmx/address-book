import { addContact } from '../helpers/firebase-querys';

export const create = (req, res) =>
  addContact(req.params.userId, req.body)
    .then(response => {
      if (response) {
        return res.status(201).send(response.val());
      } else {
        return res.status(409).send({ error: 'Contact already exists' });
      }
    })
    .catch(err => {
      if (err) {
        return res.status(404).send(err);
      }
    });
