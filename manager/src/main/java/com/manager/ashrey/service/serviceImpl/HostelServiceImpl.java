package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.HostelDto;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    public Hostel createHostel(HostelDto hostelDto) {
        Hostel hostel = new Hostel();
        hostel.setHostelName(hostelDto.getHostelName());
        return hostelRepository.save(hostel);
    }
}
