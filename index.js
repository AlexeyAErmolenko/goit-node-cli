import Contacts from "./contact.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.table(contacts);
      const data = [
        { місто: "Київ", населення: 2884000 },
        { місто: "Львів", населення: 721301 },
      ];
      console.table(data);
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      console.log("🚀 ~ get:", contact);
      break;

    case "add":
      const newContact = await Contacts.addContact({ name, email, phone });
      console.log("🚀 ~ add:", newContact);
      break;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      console.log("🚀 ~ remove:", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
