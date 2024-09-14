package com.ashrey.student_service.service.impl;

import com.ashrey.student_service.customizedException.ResourceNotFoundException;
import com.ashrey.student_service.model.Student;
import com.ashrey.student_service.repository.StudentRepository;
import com.ashrey.student_service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student getStudentByRollNumber(String rollNumber) throws ResourceNotFoundException {
        return studentRepository.findByRollNumber(rollNumber).orElseThrow(() -> new ResourceNotFoundException("Student not found with roll number: " + rollNumber));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
