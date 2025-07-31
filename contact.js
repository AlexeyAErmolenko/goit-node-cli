import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contact.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const removedContact = contacts[index];
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);
  return removedContact || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await readContacts();
  const newContact = {
    name,
    email,
    phone,
    id: crypto.randomUUID(),
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export default { listContacts, getContactById, removeContact, addContact };
