package com.manager.ashrey.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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


    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "Student_name")
    private String name;

    @Column
    private String contact;

    @Column
    private Date createdAt = new Date();

    @Column(nullable = false)
    private String temporaryPassword;

    @Column(nullable = false)
    private Boolean passwordChanged = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Outpass> outpasses;

    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Complaint> complaints;

}

