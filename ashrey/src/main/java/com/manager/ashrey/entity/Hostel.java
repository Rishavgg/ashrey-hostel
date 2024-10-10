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
@Table(name = "hostel")
public class Hostel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostelId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HostelNameEnum hostelName;

    @Column
    private int numberOfBlocks;

    @Column
    private int totalRooms;

    @OneToMany(mappedBy = "hostel", cascade = CascadeType.ALL)
    private List<Room> rooms;

    @ManyToMany(mappedBy = "hostels")
    private List<Warden> wardens;

}

