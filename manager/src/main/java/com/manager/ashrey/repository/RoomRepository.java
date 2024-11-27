package com.manager.ashrey.repository;

import com.manager.ashrey.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.block.hostel.id = :hostelId AND r.block.id = :blockId AND r.type = :roomType AND r.empty = true")
    List<Room> findAvailableRooms(@Param("hostelId") Long hostelId,
                                  @Param("blockId") Long blockId,
                                  @Param("roomType") String roomType);

}
