package com.manager.ashrey.service;

import com.manager.ashrey.entity.Student;

public interface StudentService {
    public Student createStudent(Student student);

    public Student getStudentById(Long studentId);

    public Student getStudentByRollNumber(String rollNumber);

    public Student assignRoom(Long studentId, Long roomId);

    public void deleteStudent(Long studentId);
}
