package com.manager.ashrey.controller;

import com.manager.ashrey.config.JwtBlacklist;
import com.manager.ashrey.config.JwtUtil;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.response.ResponseDTO;
import com.manager.ashrey.service.EmailService;
import com.manager.ashrey.service.StudentAuthService;
import com.manager.ashrey.service.StudentDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    private StudentAuthService studentAuthService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtBlacklist jwtBlacklist;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/addStudent")
    public ResponseEntity<ResponseDTO> addStudent(@RequestBody Student student) throws BadRequestException {
        if (studentRepository.existsByRollNumber(student.getRollNumber())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseDTO("Roll number already exists"));
        }

        String tempPassword = generateTemporaryPassword();
        student.setTemporaryPassword(passwordEncoder.encode(tempPassword));
        student.setPasswordChanged(false);

        String msg = studentAuthService.addStudent(student);

        sendEmailWithCredentials(student.getEmail(), student.getRollNumber(), tempPassword);
        ResponseDTO response = new ResponseDTO(msg);
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDTO> login(@RequestParam(name = "rollNumber") String rollNumber, @RequestParam(name = "tempPassword") String tempPassword) {
        try {
            Student student = studentRepository.findByRollNumber(rollNumber);
            if (student == null) {
                throw new RuntimeException("Student not found");
            }
            if (!passwordEncoder.matches(tempPassword, student.getTemporaryPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseDTO("Invalid roll number or password"));
            }

            UserDetails userDetails = studentDetailsService.loadUserByUsername(rollNumber);
            String token = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new ResponseDTO("Login successful", token));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("An error occurred during login."));
        }
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestParam String rollNumber, @RequestParam String newPassword) {
        try {
            Student student = studentRepository.findByRollNumber(rollNumber);

            if (student == null) {
                throw new RuntimeException("Student not found");
            }

            String encodedPassword = passwordEncoder.encode(newPassword);

            student.setTemporaryPassword(encodedPassword);
            student.setPasswordChanged(true);
            studentRepository.save(student);

            return ResponseEntity.ok(new ResponseDTO("Password updated successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO("An error occurred while updating the password."));
        }
    }

    private String generateTemporaryPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private void sendEmailWithCredentials(String email, String rollNumber, String tempPassword) {
        String subject = "Your Login Credentials";
        String body = "Your roll number is " + rollNumber + " and your temporary password is " + tempPassword;
        emailService.sendSimpleMessage(email, subject, body);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<ResponseDTO> logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);

            jwtBlacklist.blacklistToken(jwt);

            return ResponseEntity.ok(new ResponseDTO("Logout successful"));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDTO("No token found in request"));
    }

}
