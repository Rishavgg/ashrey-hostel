package com.manager.ashrey.controller;

import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.entity.Warden;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.repository.WardenRepository;
import com.manager.ashrey.service.WardenDashboardService;
import com.manager.ashrey.service.WardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/warden")
public class WardenController {

    @Autowired
    private WardenDashboardService wardenDashboardService;

    @Autowired
    private WardenRepository wardenRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @GetMapping(value = "/all")
    public List<Warden> getAllWardens() {
        return wardenRepository.findAll();
    }

    @PostMapping(value = "/addWarden")
    public Warden createWarden(@RequestBody Warden warden) {
        return wardenRepository.save(warden);
    }

    @PostMapping("/{wardenId}/assign-hostels")
    public Warden assignHostelsToWarden(@PathVariable long wardenId, @RequestBody List<Long> hostelIds) {
        Warden warden = wardenRepository.findById(wardenId).orElseThrow();
        List<Hostel> hostels = hostelRepository.findAllById(hostelIds);
        warden.setHostels(Set.copyOf(hostels));
        return wardenRepository.save(warden);
    }

    @GetMapping(value = "/dashboard/all/student")
    public ResponseEntity<Page<Student>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(wardenDashboardService.getAllStudents(page, size));
    }

    @GetMapping("/dashboard/search")
    public ResponseEntity<Page<Student>> searchStudents(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(wardenDashboardService.searchStudents(searchTerm, page, size));
    }

    @GetMapping(value = "/dashboard/filter")
    public ResponseEntity<Page<Student>> filterStudents(
            @RequestParam String hostelName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(wardenDashboardService.filterStudents(hostelName, page, size));
    }


}

