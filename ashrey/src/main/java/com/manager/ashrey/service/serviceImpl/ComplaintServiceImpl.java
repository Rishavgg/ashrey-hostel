package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Complaint;
import com.manager.ashrey.entity.ComplaintStatusEnum;
import com.manager.ashrey.entity.Outpass;
import com.manager.ashrey.entity.OutpassStatusEnum;
import com.manager.ashrey.repository.ComplaintRepository;
import com.manager.ashrey.repository.OutpassRepository;
import com.manager.ashrey.service.ComplaintService;
import com.manager.ashrey.service.OutpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletionService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public Complaint getComplaintById(Long complaintId) {
        return complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + complaintId));
    }

    public List<Complaint> getComplaintsByStudentId(Long studentId) {
        return complaintRepository.findByStudentStudentId(studentId);
    }

    public Complaint updateComplaintStatus(Long complaintId, ComplaintStatusEnum status) {
        Complaint complaint = getComplaintById(complaintId);
        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Long complaintId) {
        Complaint complaint = getComplaintById(complaintId);
        complaintRepository.delete(complaint);
    }
}
