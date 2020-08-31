import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent {
  constructor() {
    super();

    this._data = {};
  }

  formJSON(json) {
    this._data = Object.assign(this._data, json);

    this.trigger("dataChange", this.toJSON());
  }

  toJSON() {
    return this._data;
  }
}