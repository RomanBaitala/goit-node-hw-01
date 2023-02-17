const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  return JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
}

function getContactById(contactId = null) {
  if (contactId === null) return "No such id's";

  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contact = contacts.filter(
    contact => String(contact.id) === String(contactId)
  );

  if (contact.length === 0) return "There's no contacts with this id";

  return contact;
}

function removeContact(contactId) {
  if (contactId === null) return "No such id's";

  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contact = contacts.filter(
    contact => String(contact.id) !== String(contactId)
  );

  if (contacts.length === contact.length)
    return "There's no contacts with this id";

  fs.writeFileSync(contactsPath, JSON.stringify(contact), 'utf8');

  return true;
}

function addContact(contact = null) {
  if (!contact) return 'No data passed';

  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  contacts.push(contact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts), 'utf8');
  return true;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
