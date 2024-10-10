package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(unique = true, nullable = false)
    private String rollNumber;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column
    private String contact;

    @Column
    private Timestamp createdAt;

    @Column(nullable = false)
    private String temporaryPassword;

    @Column(nullable = false)
    private Boolean passwordChanged = false;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Outpass> outpasses;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Complaint> complaints;

}

