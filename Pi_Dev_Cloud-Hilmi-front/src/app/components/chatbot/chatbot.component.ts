import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  userMessage = '';
  chatMessages: { text: string; from: 'user' | 'bot' }[] = [];

  constructor(private chatService: ChatbotService) {}

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Add user message to chat history
    this.chatMessages.push({ text: this.userMessage, from: 'user' });

    // Send user message to chat service and get bot response
    this.chatService.getChatbotResponse(this.userMessage).subscribe(response => {
      // Add bot response to chat history
      this.chatMessages.push({ text: response, from: 'bot' });
    });

    // Clear input field
    this.userMessage = '';
  }

}
