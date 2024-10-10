package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String role;

    @Column
    private Timestamp createdAt;

    @Column
    private Timestamp lastLogin;

    @Column(unique = true)
    private String keycloakId;

    // One-to-One relationship with Student, Warden, Caretaker
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Student student;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Warden warden;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Caretaker caretaker;

}

