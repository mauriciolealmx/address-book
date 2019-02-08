import { addContact } from '../helpers/firebase-querys';

export const create = (req, res) =>
  addContact(req.params.userId, req.body, (err, contactSnap) => {
    if (err) {
      return res.status(409).send(err);
    }
    return res.status(201).send(contactSnap.val());
  });
