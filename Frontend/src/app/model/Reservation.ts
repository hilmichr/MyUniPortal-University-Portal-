import { Event } from "./Event";

export class Reservation{
    constructor(
      public id?: number,
      public nom_reserv?: string,
      public date_reser?: number,
      public event?: Event,
  ) {
  }
}