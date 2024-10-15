package com.manager.ashrey.controller;

import com.manager.ashrey.entity.Outpass;
import com.manager.ashrey.entity.OutpassStatusEnum;
import com.manager.ashrey.service.OutpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/outpasses")
public class OutpassController {

    @Autowired
    private OutpassService outpassService;

    @PostMapping(value = "/request-outpass")
    public ResponseEntity<Outpass> requestOutpass(@RequestBody Outpass outpass) {
        Outpass newOutpass = outpassService.requestOutpass(outpass);
        return ResponseEntity.status(HttpStatus.CREATED).body(newOutpass);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Outpass> getOutpassById(@PathVariable Long id) {
        Outpass outpass = outpassService.getOutpassById(id);
        return ResponseEntity.ok(outpass);
    }

    @GetMapping(value = "/student/{studentId}")
    public ResponseEntity<List<Outpass>> getOutpassesByStudentId(@PathVariable Long studentId) {
        List<Outpass> outpasses = outpassService.getOutpassesByStudentId(studentId);
        return ResponseEntity.ok(outpasses);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Outpass> updateOutpassStatus(@PathVariable Long id, @RequestBody OutpassStatusEnum status) {
        Outpass updatedOutpass = outpassService.updateOutpassStatus(id, status);
        return ResponseEntity.ok(updatedOutpass);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteOutpass(@PathVariable Long id) {
        outpassService.deleteOutpass(id);
        return ResponseEntity.noContent().build();
    }
}

