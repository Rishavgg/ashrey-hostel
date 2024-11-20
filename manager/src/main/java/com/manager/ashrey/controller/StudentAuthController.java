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
import org.springframework.web.bind.annotation.*;


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

    @PostMapping("/login/{rollNumber}/{tempPassword}")
    public String login(@PathVariable String rollNumber, @PathVariable String tempPassword ) throws Exception {
        // Step 1: Check if the roll number exists in the database
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student with roll number " + rollNumber + " not found"));

        // Step 2: Authenticate the student using the temporary password
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(rollNumber, tempPassword)
            );
        } catch (Exception e) {
            throw new Exception("Invalid credentials");
        }

        // Step 3: Generate JWT token after successful authentication
        final UserDetails userDetails = studentDetailsService.loadUserByUsername(rollNumber);
        return jwtUtil.generateToken(userDetails.getUsername());
    }


    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String rollNumber, @RequestParam String newPassword) {
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setTemporaryPassword(newPassword);
        student.setPasswordChanged(true);
        studentRepository.save(student);

        return "Password updated successfully";
    }

    @PostMapping("/send-email")
    public String sendEmailWithCredentials(@RequestParam String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String subject = "Login Credentials";
        String body = "Your roll number is " + student.getRollNumber() + " and your temporary password is " + student.getTemporaryPassword();
        emailService.sendSimpleMessage(email, subject, body);

        return "Email sent successfully";
    }
}
