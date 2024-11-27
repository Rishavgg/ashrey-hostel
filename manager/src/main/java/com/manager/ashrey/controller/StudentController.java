package com.manager.ashrey.controller;

import com.manager.ashrey.config.JwtUtil;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/profile")
    public ResponseEntity<Student> getStudentProfile(@RequestHeader("Authorization") String token) {
        // Extract rollNumber from the "sub" claim (assuming 'sub' holds the rollNumber)
        String rollNumber = jwtUtil.extractUsername(token.substring(7));  // Remove "Bearer " from token and extract rollNumber

        // Fetch student details from the database using the rollNumber
        Optional<Student> student = Optional.ofNullable(studentRepository.findByRollNumber(rollNumber));  // Assuming you have a method to find by rollNumber

        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(404).body(null));
    }


    @GetMapping(value = "/by-room")
    public List<Student> getStudentsByRoom(@RequestParam Long blockId, @RequestParam String roomNumber) {
        Optional<Room> rooms = roomRepository.findById(blockId);
        return studentRepository.findAll()
                .stream()
                .filter(student -> student.getRoom().getRoomNumber().equals(roomNumber))
                .toList();
    }
}

