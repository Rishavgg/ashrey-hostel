package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.StudentAuthService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentAuthServiceImpl implements StudentAuthService {

    @Autowired
    StudentRepository studentRepository;


    @Override
    public String addStudent(Student student) {
        // Check if student already exists by roll number using Optional
        Student existingStudent = studentRepository.findByRollNumber(student.getRollNumber());
        if (existingStudent != null) {
            return "Student already exists";
        }

        // Save the new student to the database
        studentRepository.save(student);

        return "Student added successfully";
    }

}
