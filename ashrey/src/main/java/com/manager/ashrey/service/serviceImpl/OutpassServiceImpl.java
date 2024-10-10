package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Outpass;
import com.manager.ashrey.entity.OutpassStatusEnum;
import com.manager.ashrey.repository.OutpassRepository;
import com.manager.ashrey.service.OutpassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutpassServiceImpl implements OutpassService {

    @Autowired
    private OutpassRepository outpassRepository;

    public Outpass requestOutpass(Outpass outpass) {
        return outpassRepository.save(outpass);
    }

    public Outpass getOutpassById(Long outpassId) {
        return outpassRepository.findById(outpassId)
                .orElseThrow(() -> new RuntimeException("Outpass not found with id: " + outpassId));
    }

    public List<Outpass> getOutpassesByStudentId(Long studentId) {
        return outpassRepository.findByStudentStudentId(studentId);
    }

    public Outpass updateOutpassStatus(Long outpassId, OutpassStatusEnum status) {
        Outpass outpass = getOutpassById(outpassId);
        outpass.setStatus(status);
        return outpassRepository.save(outpass);
    }

    public void deleteOutpass(Long outpassId) {
        Outpass outpass = getOutpassById(outpassId);
        outpassRepository.delete(outpass);
    }
}

