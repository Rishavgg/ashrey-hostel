package com.manager.ashrey.service;

import com.manager.ashrey.dto.AddStudentDto;
import com.manager.ashrey.entity.Student;
import org.apache.coyote.BadRequestException;

public interface StudentAuthService {
    String addStudent(Student student);
}
