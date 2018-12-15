import { getContacts } from '../helpers/firebase-querys';

export function retreive(req, res) {
  const { userId } = req.params;
  getContacts(userId).then(resp => {
    const { contacts } = resp;
    const contactInfo = Object.values(contacts);
    res.status(200).send(contactInfo);
  });
}
