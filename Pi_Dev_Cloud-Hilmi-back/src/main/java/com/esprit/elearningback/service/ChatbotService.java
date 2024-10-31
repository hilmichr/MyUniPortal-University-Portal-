package com.esprit.elearningback.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {

    private Map<String, String> qaPairs;

    public ChatbotService() {
        // Initialize with predefined questions and answers
        qaPairs = new HashMap<>();
        qaPairs.put("who are you", "My name is Chatbot. I'm custom made by a guy named Mahdi Jaoua and i'm sorry to tell you this but my purpose of existance is to only provide you with information about the Esprit options.");
        qaPairs.put("how are you", "I'm doing well, thank you!");
        qaPairs.put("what is cloud option", "L’option Architecture IT et Cloud Computing ArcTIC est un programme de formation pour les élèves ingénieurs dont l’objectif est de former des ingénieurs capable de : . Identifier les besoins de l’entreprise en matière d’infrastructures dématérialisées. . Concevoir des architectures de systèmes d’information des entreprises. . Assurer la mise en place d’applications et de solutions de stockage de données sur des serveurs installés dans des data centers et leur intégration dans l’architecture système de l’entreprise.");
        qaPairs.put("what is ds option", "L'objectif de l'option Data Science est d'acquérir un socle de connaissances conduisant à l'exercice opérationnel du métier de«datascientist». Par ailleurs, les objectifs de l'option DS sont: Avoir une solide connaissance en traitement statistique des données, Se familiariser avec les aspects fondamentaux du Big Data, Maîtriser les méthodes et les outils pour l'Intelligence Artificielle");
        qaPairs.put("diffrence between cloud and ds", "");
    }

    public String getResponse(String question) {
        // Match user input with predefined questions
        return qaPairs.getOrDefault(question, "Sorry, I don't understand your question.");
    }
}
