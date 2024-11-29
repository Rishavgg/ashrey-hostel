package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.AddStudentDto;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.entity.Year;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.repository.YearRepository;
import com.manager.ashrey.service.EmailService;
import com.manager.ashrey.service.StudentAuthService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StudentAuthServiceImpl implements StudentAuthService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private YearRepository yearRepository;

//    @Override
//    public String addStudent(AddStudentDto studentDTO) {
//        if (studentRepository.existsByRollNumber(studentDTO.getRollNumber())) {
//            throw new RuntimeException("Roll number already exists");
//        }
//
//        Room room = roomRepository.findById(studentDTO.getRoomId())
//                .orElseThrow(() -> new RuntimeException("Room not found"));
//
//        if (!room.isEmpty()) {
//            throw new RuntimeException("Selected room is not available");
//        }
//
//        Year year = yearRepository.findById(studentDTO.getYearId())
//                .orElseThrow(() -> new RuntimeException("Year not found"));
//
//        Student student = new Student();
//        student.setName(studentDTO.getName());
//        student.setContact(studentDTO.getContact());
//        student.setEmail(studentDTO.getEmail());
//        student.setRollNumber(studentDTO.getRollNumber());
//        student.setYear(year);
//
//        String tempPassword = generateTemporaryPassword();
//        student.setTemporaryPassword(passwordEncoder.encode(tempPassword));
//        student.setPasswordChanged(false);
//
//        student.setRoom(room);
//
//        studentRepository.save(student);
//
//        room.setEmpty(false);
//        roomRepository.save(room);
//
//        sendEmailWithCredentials(student.getEmail(), student.getRollNumber(), tempPassword);
//
//        return "Student added successfully";
//    }

    @Override
    public String addStudent(Student studentDTO) {
        if (studentRepository.existsByRollNumber(studentDTO.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }

        Student student = new Student();
        student.setName(studentDTO.getName());
        student.setContact(studentDTO.getContact());
        student.setEmail(studentDTO.getEmail());
        student.setRollNumber(studentDTO.getRollNumber());
        student.setAdmissionYear(studentDTO.getAdmissionYear());

        String tempPassword = generateTemporaryPassword();
        student.setTemporaryPassword(passwordEncoder.encode(tempPassword));
        student.setPasswordChanged(false);

        sendEmailWithCredentials(student.getEmail(), student.getRollNumber(), tempPassword);

        studentRepository.save(student);

        return "Student added successfully";
    }


    private String generateTemporaryPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }


    private void sendEmailWithCredentials(String email, String rollNumber, String tempPassword) {
        String subject = "Your Login Credentials";
        String body = "Your roll number is " + rollNumber + " and your temporary password is " + tempPassword;
        emailService.sendSimpleMessage(email, subject, body);
    }
}
