package com.manager.ashrey.controller;

import com.manager.ashrey.entity.Complaint;
import com.manager.ashrey.entity.ComplaintStatusEnum;
import com.manager.ashrey.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping(value = "/add-complaint")
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
        Complaint newComplaint = complaintService.createComplaint(complaint);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComplaint);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        Complaint complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    @GetMapping(value = "/student/{studentId}")
    public ResponseEntity<List<Complaint>> getComplaintsByStudentId(@PathVariable Long studentId) {
        List<Complaint> complaints = complaintService.getComplaintsByStudentId(studentId);
        return ResponseEntity.ok(complaints);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Complaint> updateComplaintStatus(@PathVariable Long id, @RequestBody ComplaintStatusEnum status) {
        Complaint updatedComplaint = complaintService.updateComplaintStatus(id, status);
        return ResponseEntity.ok(updatedComplaint);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
}

