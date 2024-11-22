package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Room;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student getStudentById(Long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
    }

    public Student getStudentByRollNumber(String rollNumber) {
        // Assuming findByRollNumber returns a Student, not Optional<Student>
        Student student = studentRepository.findByRollNumber(rollNumber);

        if (student != null) {
            throw new RuntimeException("Student not found");
        }
        return student;

    }

    public Student assignRoom(Long studentId, Long roomId) {
        Student student = getStudentById(studentId);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        student.setRoom(room);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        Student student = getStudentById(studentId);
        studentRepository.delete(student);
    }
}

