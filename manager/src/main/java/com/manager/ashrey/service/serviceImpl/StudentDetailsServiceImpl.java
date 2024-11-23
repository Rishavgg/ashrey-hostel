package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.StudentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class StudentDetailsServiceImpl implements UserDetailsService, StudentDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String rollNumber) throws UsernameNotFoundException {
        // Assuming findByRollNumber returns a Student, not Optional<Student>
        Student student = studentRepository.findByRollNumber(rollNumber);

        if (student == null) {
            throw new RuntimeException("Student not found");
        }


        return new org.springframework.security.core.userdetails.User(
                student.getRollNumber(),
                student.getTemporaryPassword(),
                getAuthorities()
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_STUDENT"));
        return authorities;
    }
}

