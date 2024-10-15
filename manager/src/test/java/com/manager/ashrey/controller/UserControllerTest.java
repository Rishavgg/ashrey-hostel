package com.manager.ashrey.controller;

import com.manager.ashrey.entity.User;
import com.manager.ashrey.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.HashMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@EnableWebMvc
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void testCreateUser() throws Exception {
        User user = User.builder()
                .userId(1L)
                .username("TestUser")
                .email("211351@gmail.com")
                .role("student")
                .build();

        Mockito.when(userService.createUser(Mockito.any(User.class))).thenReturn(new HashMap<>());

        mockMvc.perform(post("/users/add-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"TestUser\",\"email\":\"211351@gmail.com\",\"role\":\"Student\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("TestUser"))
                .andExpect(jsonPath("$.email").value("211351@gmail.com"))
                .andExpect(jsonPath("$.role").value("student"));

    }

    @Test
    public void testGetUserById() throws Exception {
        User user = User.builder()
                .userId(1L)
                .username("TestUser")
                .email("211351@gmail.com")
                .role("student")
                .build();

        Mockito.when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/users/get-user-by-id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("TestUser"))
                .andExpect(jsonPath("$.email").value("211351@gmail.com"))
                .andExpect(jsonPath("$.role").value("student"));
    }

}
