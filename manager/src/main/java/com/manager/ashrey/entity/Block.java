package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "block")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BlockId;

    private String blockName;

    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;

    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL)
    private Set<Room> rooms;
}
