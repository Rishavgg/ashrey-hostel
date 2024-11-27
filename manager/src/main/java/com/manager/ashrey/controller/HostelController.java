package com.manager.ashrey.controller;

import com.manager.ashrey.dto.HostelDto;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hostel")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping("/addHostel")
    public Hostel createhostel(@RequestBody HostelDto hostelDto) {
        return hostelService.createHostel(hostelDto);
    }


}
