import axios from 'axios';

export function createAccount(user) {
  return axios.post('/register', user).then(res => res.data);
}

export function login(user) {
  return axios.post('/login', user).then(res => res.data);
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
      console.error(`Unable to delete contact for ${userId}`, err.message);
    });
}

export function getUserContacts(userId) {
  return axios
    .get(`/users/${userId}/contacts`)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to get contact for ${userId}`, err.message);
    });
}
