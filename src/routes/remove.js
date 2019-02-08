import { deleteContact } from '../helpers/firebase-querys';

export const remove = (req, res) =>
  deleteContact(req.params.userId, req.body, err => {
    if (err) {
      return res.status(409).send(err);
    }
    return res.status(200).send('Deleted User');
  });
