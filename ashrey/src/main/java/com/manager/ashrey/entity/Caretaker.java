package com.manager.ashrey.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "caretakers")
public class Caretaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long caretakerId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Boolean managesHostel = false;

    @Column
    private Timestamp createdAt;

    @OneToMany(mappedBy = "caretaker", cascade = CascadeType.ALL)
    private List<Complaint> complaints;

}

