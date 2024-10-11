package com.manager.ashrey.service;

import com.manager.ashrey.entity.User;

import java.util.Map;

public interface UserService {
    public Map<String, String> createUser(User user);

    public User getUserById(Long userId);

    public User getUserByUsername(String username);

    public User updateUser(Long userId, User userDetails);

    public void deleteUser(Long userId);
}
