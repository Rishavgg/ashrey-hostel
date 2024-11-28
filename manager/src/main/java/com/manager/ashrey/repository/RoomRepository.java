package com.manager.ashrey.repository;

import com.manager.ashrey.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    // Query to get rooms based on hostelId and available capacity
    @Query("SELECT r FROM Room r WHERE r.hostel.hostelId = :hostelId AND r.currentOccupancy < r.capacity")
    Page<Room> findAvailableRoomsByHostelId(@Param("hostelId") Long hostelId, Pageable pageable);

    // Query to get rooms based on hostelId and capacity (single or double) with available space
    @Query("SELECT r FROM Room r WHERE r.hostel.hostelId = :hostelId AND r.capacity = :capacity AND r.currentOccupancy < r.capacity")
    Page<Room> findAvailableRoomsByHostelIdAndCapacity(@Param("hostelId") Long hostelId, @Param("capacity") int capacity, Pageable pageable);

    boolean existsByRoomNumberAndHostel_HostelId(String roomNumber, Long hostelId);

    @Query("SELECT r FROM Room r WHERE r.hostel.hostelId = :hostelId " +
            "AND (:capacity IS NULL OR r.capacity = :capacity) " +
            "AND (:sunlight IS NULL OR r.sunlight = :sunlight) " +
            "AND (:balcony IS NULL OR r.balcony = :balcony) " +
            "AND (:level > 0 OR r.level = :level) " +
            "AND (:floor > 0 OR r.floor = :floor) " +
            "AND r.currentOccupancy < r.capacity")
    Page<Room> findAvailableRoomsByFilters(@Param("hostelId") Long hostelId,
                                           @Param("capacity") Integer capacity,
                                           @Param("sunlight") Boolean sunlight,
                                           @Param("balcony") Boolean balcony,
                                           @Param("level") int level,
                                           @Param("floor") int floor,
                                           Pageable pageable);


}
