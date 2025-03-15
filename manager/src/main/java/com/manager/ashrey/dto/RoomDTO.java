package com.manager.ashrey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomDTO {
    private Long roomId;
    private String roomNumber;
    private int capacity;
    private int currentOccupancy;
    private int floor;
    private int level;
    private boolean sunlight;
    private boolean balcony;
    private Long hostelId;
    private String hostelName; // Added this field

    public RoomDTO(Long roomId, String roomNumber, int capacity, int currentOccupancy, Boolean sunlight, Boolean balcony, int level, int floor, Long hostelId, String hostelName) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.currentOccupancy = currentOccupancy;
        this.sunlight = sunlight;
        this.balcony = balcony;
        this.level = level;
        this.floor = floor;
        this.hostelId = hostelId;
        this.hostelName = hostelName;
    }
}
