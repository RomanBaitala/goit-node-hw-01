const contactsAPI = require('./data/contacts.js');
const { log } = require('./data/log.js');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      log(contactsAPI.listContacts());
      break;

    case 'get':
      log(contactsAPI.getContactById(id));
      break;

    case 'add':
      const newId = Date.now();

      const errMsg = [];
      if (!name) return errMsg.push('Use -n to set a contact name');
      if (!phone) return errMsg.push('Use -p to specify a phone number');
      if (!email) return errMsg.push('Use -e to define email addres');
      if (errMsg.length > 0) {
        log(
          `\n Error: not all require paremeter was defined\n\n ${errMsg.join(
            '\n'
          )}`
        );
        break;
      }
      const addRes = contactsAPI.addContact({ id: newId, name, phone, email });
      log(
        addRes === true
          ? `Contact with neme ${name} was succesfully added`
          : addRes
      );
      break;

    case 'remove':
      const result = contactsAPI.removeContact(id);
      log(
        result === true
          ? `Contact with id ${id} was succesfully deleted`
          : result
      );
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
