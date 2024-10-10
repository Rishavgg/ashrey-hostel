package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Caretaker;
import com.manager.ashrey.repository.CaretakerRepository;
import com.manager.ashrey.service.CaretakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CaretakerServiceImpl implements CaretakerService {

    @Autowired
    private CaretakerRepository caretakerRepository;

    public Caretaker createCaretaker(Caretaker caretaker) {
        return caretakerRepository.save(caretaker);
    }

    public Caretaker getCaretakerById(Long caretakerId) {
        return caretakerRepository.findById(caretakerId)
                .orElseThrow(() -> new RuntimeException("Caretaker not found with id: " + caretakerId));
    }

    public void deleteCaretaker(Long caretakerId) {
        Caretaker caretaker = getCaretakerById(caretakerId);
        caretakerRepository.delete(caretaker);
    }
}

