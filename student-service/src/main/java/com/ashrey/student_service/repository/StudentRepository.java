package com.ashrey.student_service.repository;

import com.ashrey.student_service.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {


     Optional<Student> findByRollNumber(String rollNumber);
}
