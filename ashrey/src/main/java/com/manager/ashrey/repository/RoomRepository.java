package com.manager.ashrey.repository;
import com.manager.ashrey.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHostelHostelId(Long hostelId);
}

