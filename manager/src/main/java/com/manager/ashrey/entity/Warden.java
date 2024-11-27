package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "warden")
public class Warden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wardenId;

    @Column(name = "warden_name")
    private String name;

    @Column(name = "warden_email")
    private String email;

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @Column(name = "warden_contact")
    private String contact;

    @ManyToMany
    @JoinTable(
            name = "warden_hostel",
            joinColumns = @JoinColumn(name = "warden_id"),
            inverseJoinColumns = @JoinColumn(name = "hostel_id")
    )
    private Set<Hostel> hostels;

}

