package com.edu2job.controller;

import com.edu2job.dto.PredictionHistoryDto;
import com.edu2job.dto.PredictionRequest;
import com.edu2job.dto.PredictionResponse;
import com.edu2job.service.PredictionService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    // Run job prediction
    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(Principal principal, @Valid @RequestBody PredictionRequest request) {
        PredictionResponse response = predictionService.predictAndSave(principal.getName(), request);
        return ResponseEntity.ok(response);
    }

    // Get prediction history or search by job role
    @GetMapping("/history")
    public ResponseEntity<List<PredictionHistoryDto>> getHistory(
            Principal principal,
            @RequestParam(value = "query", required = false) String query) {
        
        List<PredictionHistoryDto> history;
        if (query != null && !query.trim().isEmpty()) {
            history = predictionService.searchHistory(principal.getName(), query.trim());
        } else {
            history = predictionService.getHistory(principal.getName());
        }
        return ResponseEntity.ok(history);
    }

    // Delete a prediction history record
    @DeleteMapping("/history/{id}")
    public ResponseEntity<Void> deleteHistory(Principal principal, @PathVariable("id") Long id) {
        predictionService.deleteHistory(principal.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
