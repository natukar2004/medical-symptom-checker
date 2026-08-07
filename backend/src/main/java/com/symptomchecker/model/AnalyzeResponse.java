package com.symptomchecker.model;

public class AnalyzeResponse {

    private boolean matched;
    private String name;
    private String description;
    private String treatment;
    private String warning;
    private double matchPercentage;

    public static AnalyzeResponse noMatch() {
        AnalyzeResponse response = new AnalyzeResponse();
        response.matched = false;
        return response;
    }

    public static AnalyzeResponse of(Disease disease, double matchPercentage) {
        AnalyzeResponse response = new AnalyzeResponse();
        response.matched = true;
        response.name = disease.getName();
        response.description = disease.getDescription();
        response.treatment = disease.getTreatment();
        response.warning = disease.getWarning();
        response.matchPercentage = matchPercentage;
        return response;
    }

    public boolean isMatched() {
        return matched;
    }

    public String getName() {
        return name;
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

    public double getMatchPercentage() {
        return matchPercentage;
    }
}
