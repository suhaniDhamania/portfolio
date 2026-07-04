const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const GUESTBOOK_FILE = path.join(DATA_DIR, 'guestbook.json');
const CONTACT_FILE = path.join(DATA_DIR, 'contact.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize default guestbook entries if empty
const defaultGuestbook = [];

if (!fs.existsSync(GUESTBOOK_FILE)) {
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(defaultGuestbook, null, 2));
}

if (!fs.existsSync(CONTACT_FILE)) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify([], null, 2));
}

const FileDb = {
  getGuestbook: () => {
    try {
      const data = fs.readFileSync(GUESTBOOK_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveGuestbookEntry: (entry) => {
    try {
      const data = FileDb.getGuestbook();
      const newEntry = {
        id: Date.now(),
        ...entry,
        createdAt: new Date().toISOString()
      };
      data.push(newEntry);
      fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(data, null, 2));
      return newEntry;
    } catch (e) {
      throw new Error('Failed to save guestbook entry');
    }
  },

  getContacts: () => {
    try {
      const data = fs.readFileSync(CONTACT_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveContactMessage: (msg) => {
    try {
      const data = FileDb.getContacts();
      const newMsg = {
        id: Date.now(),
        ...msg,
        createdAt: new Date().toISOString()
      };
      data.push(newMsg);
      fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));
      return newMsg;
    } catch (e) {
      throw new Error('Failed to save contact message');
    }
  }
};

module.exports = FileDb;
