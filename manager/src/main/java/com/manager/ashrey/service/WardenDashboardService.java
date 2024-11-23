package com.manager.ashrey.service;

import com.manager.ashrey.entity.Student;
import org.springframework.data.domain.Page;

public interface WardenDashboardService {

    Page<Student> getAllStudents (int page, int size);

    Page<Student> searchStudents(String searchTerm, int page, int size);

    Page<Student> filterStudents(String hostelName, int page, int size);

}
