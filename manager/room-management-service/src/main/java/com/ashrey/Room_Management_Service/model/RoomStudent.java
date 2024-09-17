package com.ashrey.Room_Management_Service.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ROOM_STUDENT")
public class RoomStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long allocationId;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "allocated_by")
    private Long allocatedById;

    @Column(nullable = false)
    private LocalDateTime allocatedOn = LocalDateTime.now();

}
