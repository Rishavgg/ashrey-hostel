package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "caretaker_id")
    private Caretaker caretaker;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatusEnum status;

    @Column
    private String description;

    @Column
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

}


