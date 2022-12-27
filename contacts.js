const fs = require('fs').promises;
const path = require('path');
const ObjectID = require('bson-objectid')
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
    const contacts = await fs.readFile(contactsPath)
    return await JSON.parse(contacts)
  } catch (error) {
    console.log(error)
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const result = await contacts.find((item) => item.id === contactId)
  if (!result) return null
  return result
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) return null
  const [result] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContactsList = [...contacts, { id: ObjectID(), name, email, phone }];
    writeNewContacts(newContactsList);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };