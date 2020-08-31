import { Model } from "./../util/Model";
import { Firebase } from "./../util/Firebase";
import { Format } from "../util/Format";

export class Message extends Model {
  get content() {
    return this._data.content;
  }
  set content(value) {
    this._data.content = value;
  }

  get type() {
    return this._data.type;
  }
  set type(value) {
    this._data.type = value;
  }

  get timeStamp() {
    return this._data.timeStamp;
  }
  set timeStamp(value) {
    this._data.timeStamp = value;
  }

  get status() {
    return this._data.status;
  }
  set status(value) {
    this._data.status = value;
  }

  get preview() {
    return this._data.preview;
  }
  set preview(value) {
    this._data.preview = value;
  }

  get filename() {
    return this._data.filename;
  }
  set filename(value) {
    this._data.filename = value;
  }

  get fileType() {
    return this._data.fileType;
  }
  set fileType(value) {
    this._data.fileType = value;
  }

  get size() {
    return this._data.size;
  }
  set size(value) {
    this._data.size = value;
  }

  get from() {
    return this._data.from;
  }
  set from(value) {
    this._data.from = value;
  }

  get info() {
    return this._data.info;
  }
  set info(value) {
    this._data.info = value;
  }

  get photo() {
    return this._data.photo;
  }
  set photo(value) {
    this._data.photo = value;
  }

  get duration() {
    return this._data.duration;
  }
  set duration(value) {
    this._data.duration = value;
  }
}
