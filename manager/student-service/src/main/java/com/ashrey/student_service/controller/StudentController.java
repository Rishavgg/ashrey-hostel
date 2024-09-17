package com.ashrey.student_service.controller;

import com.ashrey.student_service.customizedException.ResourceNotFoundException;
import com.ashrey.student_service.model.Student;
import com.ashrey.student_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/details-by-roll-number/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable String rollNumber) throws ResourceNotFoundException {
        Student student = studentService.getStudentByRollNumber(rollNumber);
        return ResponseEntity.ok(student);
    }
    @GetMapping("/all-students")
    public List<Student> getStudentByRollNumber() {
        return studentService.getAllStudents();
    }
}
