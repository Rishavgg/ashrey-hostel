package com.manager.ashrey.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(unique = true, nullable = false)
    private String rollNumber;

    @Column(name = "student_email", nullable = false)
    private String email;

    @Column(name = "student_name")
    private String name;

    @Column(name = "student_contact")
    private String contact;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @Column(nullable = false)
    private String temporaryPassword;

    @Column(nullable = false)
    private Boolean passwordChanged = false;

    private int admissionYear;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "room_id", unique = true)
    private Room room;
}




