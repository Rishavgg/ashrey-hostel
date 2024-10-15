package com.manager.ashrey.service;

import com.manager.ashrey.entity.Hostel;

import java.util.List;

public interface HostelService {

    public Hostel createHostel(Hostel hostel);
    public Hostel getHostelById(Long hostelId);
    public List<Hostel> getAllHostels();
    public Hostel updateHostel(Long hostelId, Hostel hostelDetails);
    public void deleteHostel(Long hostelId);
}
