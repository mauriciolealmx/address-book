import { deleteContact } from '../helpers/firebase-querys';

export const remove = (req, res) =>
  deleteContact(req.params.userId, req.body)
    .then(res => {
      return res.status(200).send('Deleted User');
    })
    .catch(err => {
      if (err) {
        return res.status(202).send(err);
      }
    });
