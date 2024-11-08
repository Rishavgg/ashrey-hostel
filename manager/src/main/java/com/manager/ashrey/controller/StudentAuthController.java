package com.manager.ashrey.controller;


import com.manager.ashrey.config.JwtUtil;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.EmailService;
import com.manager.ashrey.service.StudentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

//
//@RestController
//@RequestMapping("/student/auth")
//public class StudentAuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private StudentDetailsService studentDetailsService;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private StudentRepository studentRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    @PostMapping("/login/{rollNumber}/{tempPassword}")
//    public String login(@PathVariable String rollNumber, @PathVariable String tempPassword ) throws Exception {
//        // Step 1: Check if the roll number exists in the database
//        Student student = studentRepository.findByRollNumber(rollNumber)
//                .orElseThrow(() -> new RuntimeException("Student with roll number " + rollNumber + " not found"));
//
//        // Step 2: Authenticate the student using the temporary password
////        try {
////            authenticationManager.authenticate(
////                    new UsernamePasswordAuthenticationToken(rollNumber, tempPassword)
////            );
////        } catch (Exception e) {
////            throw new Exception("Invalid credentials");
////        }
//
//        // Step 3: Generate JWT token after successful authentication
//        final UserDetails userDetails = studentDetailsService.loadUserByUsername(rollNumber);
//        return jwtUtil.generateToken(userDetails.getUsername());
//    }
//
//
//    @PostMapping("/reset-password")
//    public String resetPassword(@RequestParam String rollNumber, @RequestParam String newPassword) {
//        Student student = studentRepository.findByRollNumber(rollNumber)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        student.setTemporaryPassword(newPassword);
//        student.setPasswordChanged(true);
//        studentRepository.save(student);
//
//        return "Password updated successfully";
//    }
//
//    @PostMapping("/send-email")
//    public String sendEmailWithCredentials(@RequestParam String email) {
//        Student student = studentRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        String subject = "Login Credentials";
//        String body = "Your roll number is " + student.getRollNumber() + " and your temporary password is " + student.getTemporaryPassword();
//        emailService.sendSimpleMessage(email, subject, body);
//
//        return "Email sent successfully";
//    }
//}

@RestController
@RequestMapping("/student/auth")
public class StudentAuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private StudentDetailsService studentDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder; // BCrypt password encoder

    // Step 1: Warden adds student and email credentials to each student
    @PostMapping("/addStudent")
    public String addStudent(@RequestBody Student student) {
        // Generate temporary password
        String tempPassword = generateTemporaryPassword(); // Implement this method
        student.setTemporaryPassword(passwordEncoder.encode(tempPassword)); // Save encoded password
        student.setPasswordChanged(false); // Initial state

        // Save student
        studentRepository.save(student);

        // Send email with temporary credentials
        sendEmailWithCredentials(student.getEmail(), student.getRollNumber(), tempPassword);
        return "Student added and email sent!";
    }

    // Step 2: First login using roll number and temporary password
    @PostMapping("/login")
    public String login(@RequestParam String rollNumber, @RequestParam String tempPassword) throws Exception {
        // Find student by roll number
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student with roll number " + rollNumber + " not found"));

        // Check if temporary password matches
        if (!passwordEncoder.matches(tempPassword, student.getTemporaryPassword())) {
            throw new Exception("Invalid temporary password");
        }

        // Generate JWT token after successful authentication
        UserDetails userDetails = studentDetailsService.loadUserByUsername(rollNumber);
        return jwtUtil.generateToken(userDetails.getUsername());
    }

    // Step 3: Password reset after first login
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String rollNumber, @RequestParam String newPassword) {
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Hash the new password using BCrypt (not JWT)
        String encodedPassword = passwordEncoder.encode(newPassword);

        student.setTemporaryPassword(encodedPassword);
        student.setPasswordChanged(true); // Mark password as changed
        studentRepository.save(student);

        return "Password updated successfully";
    }

    // Utility to generate temporary password (step 1)
    private String generateTemporaryPassword() {
        return UUID.randomUUID().toString().substring(0, 8); // Example temp password
    }

    // Email the student credentials (step 1)
    private void sendEmailWithCredentials(String email, String rollNumber, String tempPassword) {
        String subject = "Your Login Credentials";
        String body = "Your roll number is " + rollNumber + " and your temporary password is " + tempPassword;
        emailService.sendSimpleMessage(email, subject, body);
    }
}

