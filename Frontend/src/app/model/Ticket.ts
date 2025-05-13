import { Event } from "./Event";

export class Ticket{
    constructor(
      public id?: number,
      public nbr_ticket?: number,
      public type?: String,
      public numero?: number,
      public prix?: number,
      public event?: Event
  ) {
  }
}