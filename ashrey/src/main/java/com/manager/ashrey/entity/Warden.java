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
@Table(name = "wardens")
public class Warden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wardenId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Timestamp createdAt;

    @ManyToMany
    @JoinTable(
            name = "warden_hostel",
            joinColumns = @JoinColumn(name = "warden_id"),
            inverseJoinColumns = @JoinColumn(name = "hostel_id")
    )
    private List<Hostel> hostels;

    @OneToMany(mappedBy = "warden", cascade = CascadeType.ALL)
    private List<Outpass> outpasses;

}

