package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.User;
import com.manager.ashrey.repository.UserRepository;
import com.manager.ashrey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, String> createUser(User user) {
        HashMap<String, String> message = new HashMap<>();
        if (userRepository.existsByUsername(user.getUsername())) {
            message.put("message", "user name already exists");
            return  message;
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            message.put("message", "User already exists with same email");
            return  message;
        }

        userRepository.save(user);
        message.put("message", "User Created Successfully");
        return message;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public User updateUser(Long userId, User userDetails) {
        User user = getUserById(userId);
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        // Add more fields to update if needed
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = getUserById(userId);
        userRepository.delete(user);
    }
}

