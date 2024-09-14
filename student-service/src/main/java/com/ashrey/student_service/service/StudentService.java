package com.ashrey.student_service.service;

import com.ashrey.student_service.customizedException.ResourceNotFoundException;
import com.ashrey.student_service.model.Student;

import java.util.List;

public interface StudentService {
    public Student getStudentByRollNumber(String rollNumber) throws ResourceNotFoundException;
    public List<Student> getAllStudents();
}
