package com.ashrey.Room_Management_Service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "HOSTEL")
public class Hostel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostelId;

    @Column(nullable = false, unique = true)
    private String hostelName;

    @Column(nullable = false)
    private int numberOfBlocks;

    @Column(nullable = false)
    private int totalRooms;
}
