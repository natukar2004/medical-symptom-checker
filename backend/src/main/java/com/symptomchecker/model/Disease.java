package com.symptomchecker.model;

import java.util.List;

public class Disease {

    private final String name;
    private final List<String> symptoms;
    private final String description;
    private final String treatment;
    private final String warning;

    public Disease(String name, List<String> symptoms, String description,
                    String treatment, String warning) {
        this.name = name;
        this.symptoms = symptoms;
        this.description = description;
        this.treatment = treatment;
        this.warning = warning;
    }

    public String getName() {
        return name;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public String getDescription() {
        return description;
    }

    public String getTreatment() {
        return treatment;
    }

    public String getWarning() {
        return warning;
    }
}
