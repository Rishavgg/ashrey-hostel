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
@Table(name = "outpass")
public class Outpass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long outpassId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private Timestamp requestDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OutpassStatusEnum status = OutpassStatusEnum.PENDING;

    @ManyToOne
    @JoinColumn(name = "warden_id")
    private Warden warden;

}

