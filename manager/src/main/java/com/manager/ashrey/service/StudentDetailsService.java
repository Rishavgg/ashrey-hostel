package com.manager.ashrey.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public interface StudentDetailsService {
    public UserDetails loadUserByUsername(String rollNumber) throws UsernameNotFoundException;
}
