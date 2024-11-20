package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Warden;
import com.manager.ashrey.repository.WardenRepository;
import com.manager.ashrey.service.WardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WardenServiceImpl implements WardenService {

    @Autowired
    private WardenRepository wardenRepository;

    public Warden createWarden(Warden warden) {
        return wardenRepository.save(warden);
    }

    public Warden getWardenById(Long wardenId) {
        return wardenRepository.findById(wardenId)
                .orElseThrow(() -> new RuntimeException("Warden not found with id: " + wardenId));
    }

    public void deleteWarden(Long wardenId) {
        Warden warden = getWardenById(wardenId);
        wardenRepository.delete(warden);
    }
}
