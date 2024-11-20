package com.manager.ashrey.controller;

import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.service.HostelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/hostels")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping(value = "/add-hostel")
    public ResponseEntity<Hostel> createHostel(@RequestBody Hostel hostel) {
        Hostel newHostel = hostelService.createHostel(hostel);
        return ResponseEntity.status(HttpStatus.CREATED).body(newHostel);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Hostel> getHostelById(@PathVariable Long id) {
        Hostel hostel = hostelService.getHostelById(id);
        return ResponseEntity.ok(hostel);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Hostel>> getAllHostels() {
        List<Hostel> hostels = hostelService.getAllHostels();
        return ResponseEntity.ok(hostels);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Hostel> updateHostel(@PathVariable Long id, @RequestBody Hostel hostelDetails) {
        Hostel updatedHostel = hostelService.updateHostel(id, hostelDetails);
        return ResponseEntity.ok(updatedHostel);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteHostel(@PathVariable Long id) {
        hostelService.deleteHostel(id);
        return ResponseEntity.noContent().build();
    }
}

