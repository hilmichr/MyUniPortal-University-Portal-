package com.esprit.elearningback.service;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class BadWordFilterService implements IBadWordFilterService{

    private List<String> badWords = new ArrayList<>();

    public BadWordFilterService() {
        loadBadWordsFromFile();
    }

    @Override
    public boolean containsBadWord(String input) {
        //opération qui supprime les espaces en début et en fin de chaîne dans la variable input
        input = input.trim();
        for (String badWord : badWords) {
            System.out.println("Comparing: " + input.toLowerCase() + " with " + badWord.toLowerCase());
            if (input.toLowerCase().contains(badWord.toLowerCase())) {
                System.out.println("Match found!");
                return true;
            }
        }
        return false;
    }




    private void loadBadWordsFromFile() {
        try {
            // Lecture de toutes les lignes du fichier contenant les mots inappropriés
            List<String> lines = Files.readAllLines(Paths.get("C:\\Users\\chouc\\OneDrive\\Bureau\\e-learning\\badwords.txt"));
            // Traitement de chaque ligne pour remplir la liste des mots inappropriés
            for (String line : lines) {
                // Ajout du mot inapproprié à la liste (si la ligne n'est pas vide)
                String trimmedLine = line.trim();
                if (!trimmedLine.isEmpty()) {
                    badWords.add(trimmedLine);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}