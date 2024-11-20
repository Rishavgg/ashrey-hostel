package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(unique = true, nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private int floor;

    @Column
    private int level;

    @Column
    private Boolean isAllocated = false;

    @Column
    private Boolean sunlight;

    @Column
    private Boolean balcony;

    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BlockNameEnum blockName;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Student> students;

}

