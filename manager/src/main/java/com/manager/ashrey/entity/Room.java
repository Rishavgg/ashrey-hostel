package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RoomId;

    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    private boolean empty = true;

    @ManyToOne
    @JoinColumn(name = "block_id")
    private Block block;



//    @Column(nullable = false)
//    private int floor;
//
//    @Column
//    private int level;
//
//    @Column
//    private Boolean isAllocated = false;
//
//    @Column
//    private Boolean sunlight;
//
//    @Column
//    private Boolean balcony;
//
//    @ManyToOne
//    @JoinColumn(name = "hostel_id")
//    private Hostel hostel;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private BlockNameEnum blockName;
//
//    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
//    private List<Student> students;

}

