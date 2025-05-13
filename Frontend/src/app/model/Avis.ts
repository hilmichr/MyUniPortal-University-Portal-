import { Event } from './Event';

export class Avis {
  constructor(
    public id?: number,
    public contenu?: string,
    public event?: Event,
    public status?: string
  ) {}
}
