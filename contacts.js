const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, './db/contacts.json');

async function writeNewContacts(data) {
  try {
    const normalizedContactsData = JSON.stringify(data);
    await fs.writeFile(contactsPath, normalizedContactsData, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return await JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactsList = contacts.filter(({ id }) => id !== contactId);
    writeNewContacts(newContactsList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContactsList = [...contacts, { id: nanoid(), name, email, phone }];
    writeNewContacts(newContactsList);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };