package com.symptomchecker.service;

import com.symptomchecker.model.AnalyzeResponse;
import com.symptomchecker.model.Disease;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DiagnosisService {

    private final List<Disease> diseases = List.of(
            new Disease(
                    "Common Cold",
                    List.of("fever", "cough", "headache", "sore_throat", "runny_nose"),
                    "A viral infection affecting the upper respiratory tract.",
                    "Rest, fluids, vitamin C supplements, decongestants",
                    "Usually resolves in 7-10 days"
            ),
            new Disease(
                    "Dengue Fever",
                    List.of("fever", "headache", "body_pain", "joint_pain", "rash"),
                    "A mosquito-borne viral infection causing severe fever and pain.",
                    "Hospitalization may be needed, supportive care, platelet monitoring",
                    "Requires immediate medical attention if symptoms worsen"
            ),
            new Disease(
                    "Migraine",
                    List.of("headache", "nausea", "vision_changes", "sensitivity_to_light"),
                    "A neurological condition causing severe headaches.",
                    "Pain relievers, preventive medications, rest in dark quiet room",
                    "If headache is sudden and severe, seek emergency care"
            ),
            new Disease(
                    "Gastroenteritis",
                    List.of("vomiting", "diarrhea", "fever", "stomach_pain", "nausea"),
                    "Inflammation of stomach and intestines, usually from infection.",
                    "Oral rehydration, bland diet, anti-nausea medication if needed",
                    "Stay hydrated to prevent dehydration"
            ),
            new Disease(
                    "Arthritis",
                    List.of("joint_pain", "ankle_pain", "swelling", "stiffness"),
                    "Inflammation of joints causing pain and reduced mobility.",
                    "Anti-inflammatory medications, physical therapy, heat/cold therapy",
                    "Chronic condition requiring long-term management"
            ),
            new Disease(
                    "Influenza (Flu)",
                    List.of("fever", "cough", "headache", "body_pain", "fatigue"),
                    "Contagious respiratory illness caused by influenza virus.",
                    "Antiviral medications, rest, fluids, fever management",
                    "Can lead to serious complications, especially in high-risk groups"
            )
    );

    /**
     * Same rule as the original app: for each disease, compute the percentage
     * of its symptom list that the user reported as true. Only percentages
     * above 50% are eligible; the highest-scoring disease wins.
     */
    public AnalyzeResponse analyze(Map<String, Boolean> reportedSymptoms) {
        if (reportedSymptoms == null) {
            reportedSymptoms = Map.of();
        }
        final Map<String, Boolean> symptoms = reportedSymptoms;

        Optional<AnalyzeResponse> best = diseases.stream()
                .map(disease -> {
                    long matchCount = disease.getSymptoms().stream()
                            .filter(s -> Boolean.TRUE.equals(symptoms.get(s)))
                            .count();
                    double percent = (matchCount * 100.0) / disease.getSymptoms().size();
                    double score = percent > 50 ? percent : 0;
                    return Map.entry(disease, score);
                })
                .filter(entry -> entry.getValue() > 0)
                .max(Map.Entry.comparingByValue())
                .map(entry -> AnalyzeResponse.of(entry.getKey(), entry.getValue()));

        return best.orElseGet(AnalyzeResponse::noMatch);
    }

    public List<Disease> getDiseaseCatalog() {
        return diseases;
    }
}
