package com.manager.ashrey.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
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

    @PrePersist
    protected void onCreate() {
        this.createdAt = Timestamp.valueOf(LocalDateTime.now(ZoneId.systemDefault()));
    }

    // One-to-One relationship with Student, Warden, Caretaker
//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Student student;
//
//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Warden warden;
//
//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Caretaker caretaker;


}

