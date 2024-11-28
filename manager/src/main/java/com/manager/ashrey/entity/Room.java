package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomNumber;

    private int capacity;

    private int currentOccupancy = 0;

    public boolean hasSpace() {
        return currentOccupancy < capacity;
    }

    @Column(nullable = false)
    private int floor;

    @Column
    private int level;

    @Column
    private Boolean sunlight;

    @Column
    private Boolean balcony;

    @ManyToOne
    @JoinColumn(name = "hostel_id", nullable = false)
    private Hostel hostel;


    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Student> students;

}


