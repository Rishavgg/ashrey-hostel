package com.ashrey.Room_Management_Service.model;

import com.ashrey.Room_Management_Service.enums.RoomCapacity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ROOM")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne
    @JoinColumn(name = "blockId")
    private Block block;

    private String roomNumber;
    private int floor;

    @Enumerated(EnumType.STRING)
    private RoomCapacity capacity;

    @Column(nullable = false)
    private int occupancy = 0;

    private boolean medicalRoom;
    private boolean hasBalcony;
    private boolean isSunny;

    public int getAvailableOccupancy() {
        return capacity.getCapacity() - occupancy;
    }
}

// service to get student id by student rollnumber