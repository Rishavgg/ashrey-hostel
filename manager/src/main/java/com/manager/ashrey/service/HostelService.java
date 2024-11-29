package com.manager.ashrey.service;

import com.manager.ashrey.dto.HostelDTO;
import com.manager.ashrey.entity.Hostel;

public interface HostelService {

    Hostel createHostel(HostelDTO hostelDto);

    Hostel createHostelIfNotExists(HostelDTO hostelDto);
}
