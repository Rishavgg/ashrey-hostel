package com.manager.ashrey.controller;

import com.manager.ashrey.config.JwtBlacklist;
import com.manager.ashrey.config.JwtUtil;
import com.manager.ashrey.dto.ResetPasswordDto;
import com.manager.ashrey.dto.UserDto;
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
    public ResponseEntity<ResponseDTO> addStudent(@RequestBody Student student) {
        try {
            if (studentRepository.existsByRollNumber(student.getRollNumber())) {
                return ResponseEntity.ok(new ResponseDTO("Roll number already exists"));
            }

            String tempPassword = generateTemporaryPassword();
            student.setTemporaryPassword(passwordEncoder.encode(tempPassword));
            student.setPasswordChanged(false);

            String msg = studentAuthService.addStudent(student);

            sendEmailWithCredentials(student.getEmail(), student.getRollNumber(), tempPassword);
            ResponseDTO response = new ResponseDTO(msg);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDTO("Error in adding student!"));
        }

    }


    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody UserDto userDto) {
        try {
            Student student = studentRepository.findByRollNumber(userDto.getRollNumber());
            if (student == null) {
                return ResponseEntity.ok(new ResponseDTO("Student not found"));
            }
            if (!passwordEncoder.matches(userDto.getPassword(), student.getTemporaryPassword())) {
                return ResponseEntity.ok(new ResponseDTO("Wrong Credential"));
            }

            UserDetails userDetails = studentDetailsService.loadUserByUsername(userDto.getRollNumber());
            String token = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new ResponseDTO("Login successful", token));

        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDTO("Wrong Credential"));
        }
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
        try {
            Student student = studentRepository.findByRollNumber(resetPasswordDto.getRollNumber());

            if (student == null) {
                return ResponseEntity.ok(new ResponseDTO("Student not found!"));
            }
            if (student.getPasswordChanged()) {
                return ResponseEntity.ok(new ResponseDTO("You have already Changed you password once, contact warden"));
            }
            String oldEncodedPassword = passwordEncoder.encode(resetPasswordDto.getOldPassword());
            if (!passwordEncoder.matches(resetPasswordDto.getOldPassword(), student.getTemporaryPassword())) {
                return ResponseEntity.ok(new ResponseDTO("Wrong Temporary Password!"));
            }
            String encodedPassword = passwordEncoder.encode(resetPasswordDto.getPassword());

            student.setTemporaryPassword(encodedPassword);
            student.setPasswordChanged(true);
            studentRepository.save(student);

            return ResponseEntity.ok(new ResponseDTO("Password updated successfully"));

        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDTO("An error occurred while updating the password!"));
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
