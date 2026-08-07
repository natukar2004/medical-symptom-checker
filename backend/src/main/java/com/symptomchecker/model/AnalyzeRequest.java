package com.symptomchecker.model;

import java.util.Map;

public class AnalyzeRequest {

    private Map<String, Boolean> symptoms;

    public Map<String, Boolean> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Map<String, Boolean> symptoms) {
        this.symptoms = symptoms;
    }
}
