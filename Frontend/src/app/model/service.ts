import { Subject } from './subject'; // Assuming you have a Subject model

export class Service {
    serviceid: number;
    service_name: string;
    service_description: string;
    subject: Subject;
  
    constructor(serviceid: number, service_name: string, service_description: string, subject: Subject) {
      this.serviceid = serviceid;
      this.service_name = service_name;
      this.service_description = service_description;
      this.subject = subject;
    }
  }