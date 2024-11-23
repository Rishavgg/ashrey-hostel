package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.WardenDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class WardenDashboardServiceImpl implements WardenDashboardService {

    @Autowired
    private StudentRepository studentRepository;


    @Override
    public Page<Student> getAllStudents(int page, int size) {
        return studentRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Student> searchStudents(String searchTerm, int page, int size) {
        return studentRepository.findByRollNumberOrName(searchTerm ,PageRequest.of(page, size));
    }

    @Override
    public Page<Student> filterStudents(String hostelName, int page, int size) {
        return studentRepository.findByHostel(hostelName, PageRequest.of(page, size));
    }
}
