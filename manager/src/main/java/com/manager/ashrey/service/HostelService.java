package com.manager.ashrey.service;

import com.manager.ashrey.dto.HostelDto;
import com.manager.ashrey.entity.Hostel;

public interface HostelService {

    Hostel createHostel(HostelDto hostelDto);
}
