import axios from 'axios';

export function createAccount(user) {
  return axios.post('/register', user).then(res => res.data);
}

export function createContact(userId, contact) {
  return axios
    .post(`/users/${userId}/contacts`, contact)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to create contact for ${userId}`, err.message);
    });
}

export function deleteContact(userId, contact) {
  return axios
    .put(`/users/${userId}/contacts`, contact)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to create contact for ${userId}`, err.message);
    });
}

export function getUserContacts(userJwtToken, userId) {
  return axios
    .get(`/users/${userId}/contacts?token=${userJwtToken}`)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to get contact for ${userId}`, err.message);
    });
}
