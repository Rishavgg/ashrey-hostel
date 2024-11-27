package com.manager.ashrey.repository;

import com.manager.ashrey.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByRollNumber(String rollNumber);

    Optional<Student> findByEmail(String email);

    boolean existsByRollNumber(String rollNumber);

    @Query("SELECT s FROM Student s WHERE LOWER(s.rollNumber) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")   
    Page<Student> findByRollNumberOrName(String searchTerm, Pageable pageable);

}
