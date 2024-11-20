package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    public Hostel createHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    public Hostel getHostelById(Long hostelId) {
        return hostelRepository.findById(hostelId)
                .orElseThrow(() -> new RuntimeException("Hostel not found with id: " + hostelId));
    }

    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    public Hostel updateHostel(Long hostelId, Hostel hostelDetails) {
        Hostel hostel = getHostelById(hostelId);
        hostel.setNumberOfBlocks(hostelDetails.getNumberOfBlocks());
        hostel.setTotalRooms(hostelDetails.getTotalRooms());
        return hostelRepository.save(hostel);
    }

    public void deleteHostel(Long hostelId) {
        Hostel hostel = getHostelById(hostelId);
        hostelRepository.delete(hostel);
    }
}
