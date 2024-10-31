import { Image } from './Image';

export class Event {
  constructor(
    public id?: number,
    public nom?: string,
    public nbrPlace?: number,
    public date_fin?: Date,
    public date_deb?: Date,
    public lieu?: String,
    public imagecloud?: Image,
    public type?: string
  ) {}
}
