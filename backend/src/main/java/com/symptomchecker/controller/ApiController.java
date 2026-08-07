package com.symptomchecker.controller;

import com.symptomchecker.model.AnalyzeRequest;
import com.symptomchecker.model.AnalyzeResponse;
import com.symptomchecker.service.DiagnosisService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final DiagnosisService diagnosisService;

    public ApiController(DiagnosisService diagnosisService) {
        this.diagnosisService = diagnosisService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> body = new LinkedHashMap<>();
        body.put("status", "ok");
        body.put("app", "Medical Symptom Checker");
        return body;
    }

    /**
     * The fixed yes/no question list the frontend walks through.
     * Kept here so the question set and the matching logic stay in sync.
     */
    @GetMapping("/questions")
    public List<Map<String, String>> questions() {
        String[][] raw = {
                {"fever", "Do you have a fever?"},
                {"cough", "Do you have a cough?"},
                {"headache", "Do you have a headache?"},
                {"body_pain", "Do you experience body/muscle pain?"},
                {"joint_pain", "Do you have joint pain?"},
                {"ankle_pain", "Do you have ankle pain?"},
                {"nausea", "Do you feel nauseous?"},
                {"vomiting", "Are you vomiting?"},
                {"diarrhea", "Do you have diarrhea?"},
                {"stomach_pain", "Do you have stomach pain?"},
                {"sore_throat", "Do you have a sore throat?"},
                {"runny_nose", "Do you have a runny or stuffy nose?"},
                {"rash", "Do you have any rash on your body?"},
                {"vision_changes", "Do you experience vision changes?"},
                {"sensitivity_to_light", "Are you sensitive to light?"},
                {"swelling", "Do you have any joint swelling?"},
                {"stiffness", "Do you experience joint stiffness?"},
                {"fatigue", "Do you feel unusually tired?"}
        };

        return java.util.Arrays.stream(raw)
                .map(q -> {
                    Map<String, String> m = new LinkedHashMap<>();
                    m.put("id", q[0]);
                    m.put("question", q[1]);
                    return m;
                })
                .toList();
    }

    @PostMapping("/analyze")
    public AnalyzeResponse analyze(@RequestBody AnalyzeRequest request) {
        return diagnosisService.analyze(request.getSymptoms());
    }
}
