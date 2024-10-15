package com.manager.ashrey.service;

import com.manager.ashrey.entity.Complaint;
import com.manager.ashrey.entity.ComplaintStatusEnum;

import java.util.List;

public interface ComplaintService {
    public Complaint createComplaint(Complaint complaint);

    public Complaint getComplaintById(Long complaintId);

    public List<Complaint> getComplaintsByStudentId(Long studentId);

    public Complaint updateComplaintStatus(Long complaintId, ComplaintStatusEnum status);

    public void deleteComplaint(Long complaintId);
}
