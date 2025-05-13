import { Subject } from './subject'; // Assuming you have a Subject model

export class Ressources {
  id_ressources: number;
  ressourceName: string;
  ressource_type: string;
  fileData: any; // Adjust the type based on your needs
  subject: Subject;

  constructor(
    id_ressources: number,
    ressourceName: string,
    ressource_type: string,
    fileData: any,
    subject: Subject
  ) {
    this.id_ressources = id_ressources;
    this.ressourceName = ressourceName;
    this.ressource_type = ressource_type;
    this.fileData = fileData;
    this.subject = subject;
  }
}