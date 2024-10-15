package com.manager.ashrey.controller;

import com.manager.ashrey.entity.Student;
import com.manager.ashrey.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/add-student")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student newStudent = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStudent);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @GetMapping(value = "/roll/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable String rollNumber) {
        Student student = studentService.getStudentByRollNumber(rollNumber);
        return ResponseEntity.ok(student);
    }

    @PutMapping(value = "/{studentId}/room/{roomId}")
    public ResponseEntity<Student> assignRoom(@PathVariable Long studentId, @PathVariable Long roomId) {
        Student updatedStudent = studentService.assignRoom(studentId, roomId);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard")
    public String getStudentDashboard() {
        return "Welcome to the Student Dashboard";
    }

    @GetMapping("/room-application")
    public String applyForRoom() {
        return "Room application form for students";
    }

    @GetMapping("/complaints")
    public String viewComplaints() {
        return "Student complaint management";
    }
}

