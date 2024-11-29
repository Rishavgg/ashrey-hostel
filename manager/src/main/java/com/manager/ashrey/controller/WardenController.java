package com.manager.ashrey.controller;

import com.manager.ashrey.dto.HostelDTO;
import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.dto.StudentDTO;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.entity.Warden;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.repository.WardenRepository;
import com.manager.ashrey.response.ResponseDTO;
import com.manager.ashrey.service.WardenDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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


    @GetMapping(value = "/dashboard/all/student")
    public ResponseEntity<Page<StudentDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Page<StudentDTO> students = wardenDashboardService.getAllStudentDTOs(page, size);
        return ResponseEntity.ok(students);
    }

    @GetMapping(value = "/dashboard/search")
    public ResponseEntity<Page<StudentDTO>> searchStudents(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Page<StudentDTO> students = wardenDashboardService.searchStudentDTOs(searchTerm, page, size);
        return ResponseEntity.ok(students);
    }

//    @GetMapping(value = "/dashboard/all/student")
//    public ResponseEntity<Page<Student>> getAllStudents(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size) {
//        return ResponseEntity.ok(wardenDashboardService.getAllStudents(page, size));
//    }

//    @GetMapping(value = "/dashboard/search")
//    public ResponseEntity<Page<Student>> searchStudents(
//            @RequestParam String searchTerm,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size) {
//        return ResponseEntity.ok(wardenDashboardService.searchStudents(searchTerm, page, size));
//    }

    @GetMapping(value = "/hostels")
    public ResponseEntity<List<HostelDTO>> getAllHostels() {
        // Fetch all hostels from the repository
        List<Hostel> hostels = hostelRepository.findAll();

        // Map the Hostel entities to HostelDTOs (with only name and id)
        List<HostelDTO> hostelDTOs = hostels.stream()
                .map(hostel -> new HostelDTO(hostel.getHostelId(), hostel.getHostelName()))  // Passing null for rooms, as you don't want to include them
                .collect(Collectors.toList());

        // Return the list of HostelDTOs
        return ResponseEntity.ok(hostelDTOs);
    }



    @GetMapping(value = "/hostels/{hostelId}/rooms")
    public ResponseEntity<Page<RoomDTO>> getAvailableRooms(
            @PathVariable Long hostelId,
            @RequestParam(required = false) Boolean singleRoom,  // true for single, false for double, null for both
            @RequestParam(required = false) Boolean sunlight,  // true for rooms with sunlight, false for those without
            @RequestParam(required = false) Boolean balcony,  // true for rooms with a balcony, false for those without
            @RequestParam(defaultValue = "0") int level,  // Filter by level
            @RequestParam(defaultValue = "0") int floor,  // Filter by floor
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Call service to filter rooms based on the provided parameters
        Page<RoomDTO> rooms = wardenDashboardService.getFilteredRooms(hostelId, singleRoom, sunlight, balcony, level, floor, page, size);
        return ResponseEntity.ok(rooms);
    }


    @PostMapping(value = "/students/{studentId}/assign-room/{roomId}")
    public ResponseEntity<ResponseDTO> assignRoomToStudent(
            @PathVariable Long studentId,
            @PathVariable Long roomId) {

        boolean success = wardenDashboardService.assignRoomToStudent(studentId, roomId);

        if (success) {
            return ResponseEntity.ok(new ResponseDTO("Room assigned successfully."));
        } else {
            return ResponseEntity.ok(new ResponseDTO("Room is already fully occupied or invalid room!"));
        }
    }

    @PostMapping(value = "/students/{studentId}/reassign-room/{roomId}")
    public ResponseEntity<ResponseDTO> reassignRoomToStudent(
            @PathVariable Long studentId,
            @PathVariable Long roomId) {

        boolean success = wardenDashboardService.reassignRoomToStudent(studentId, roomId);

        if (success) {
            return ResponseEntity.ok(new ResponseDTO("Room reassigned successfully."));
        } else {
            return ResponseEntity.ok(new ResponseDTO("Unable to reassign room.(same student is already present in same room or room not available"));
        }
    }


}

