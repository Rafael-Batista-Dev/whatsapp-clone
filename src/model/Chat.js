import { Model } from "./../util/Model";
import { Firebase } from "../util/Firebase";

export class Chat extends Model {
  constructor() {
    super();
  }

  get users() {
    return this._data.users;
  }
  set users(value) {
    this._data.users = value;
  }

  get timeStamp() {
    return this._data.timeStamp;
  }
  set timeStamp(value) {
    this._data.timeStamp = value;
  }

  static getRef() {
    return Firebase.db().collection("/chats");
  }

  static create(meEmail, contactEMail) {
    return new Promise((s, f) => {
      let users = {};

      users[btoa(meEmail)] = true;
      users[btoa(contactEMail)] = true;

      Chat.getRef()
        .add({
          users,
          timeStamp: new Date(),
        })
        .then((doc) => {
          Chat.getRef()
            .doc(doc.id)
            .get()
            .then((chat) => {
              s(chat);
            })
            .catch((err) => {
              f(err);
            });
        })
        .catch((err) => {
          f(err);
        });
    });
  }

  static find(meEmail, contactEMail) {
    return Chat.getRef()
      .where(btoa(meEmail), "==", true)
      .where(btoa(contactEMail), "==", true)
      .get();
  }

  static createIfNotExists(meEmail, contactEMail) {
    return new Promise((s, f) => {
      Chat.find(meEmail, contactEMail)
        .then((chats) => {
          if (chats.empty) {
            Chat.create(meEmail, contactEMail).then((chat) => {
              s(chat);
            });
          } else {
            chats.forEach((chat) => {
              s(chat);
            });
          }
        })
        .catch((err) => {
          f(err);
        });
    });
  }
}
