package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.HostelDTO;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Hostel createHostel(HostelDTO hostelDto) {
        Hostel hostel = new Hostel();
        hostel.setHostelName(hostelDto.getHostelName());
        return hostelRepository.save(hostel);
    }

    @Override
    public Hostel createHostelIfNotExists(HostelDTO hostelDto) {
        return hostelRepository.findByHostelName(hostelDto.getHostelName())
                .orElseGet(() -> createHostel(hostelDto));
    }
}
