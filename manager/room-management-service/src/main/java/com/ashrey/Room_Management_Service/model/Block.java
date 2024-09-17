package com.ashrey.Room_Management_Service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "HOSTEL_BLOCK")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockId;

    @ManyToOne
    @JoinColumn(name = "hostelId")
    private Hostel hostel;

    private String blockName;
    private int totalFloors;
}
