import { getContacts } from '../helpers/firebase-querys';

export function retreive(req, res) {
  const { userId } = req.params;
  getContacts(userId).then(resp => {
    if (resp) {
      const { contacts } = resp;
      const contactInfo = Object.values(contacts);
      return res.status(200).send(contactInfo);
    }
    return res.status(200).send([]);
  });
}
