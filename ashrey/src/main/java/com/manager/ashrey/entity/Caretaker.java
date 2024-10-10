package com.manager.ashrey.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.security.Timestamp;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
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

