package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.entity.Room;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
    }

    public List<Room> getRoomsByHostel(Long hostelId) {
        return roomRepository.findByHostelHostelId(hostelId);
    }

    public Room updateRoom(Long roomId, Room roomDetails) {
        Room room = getRoomById(roomId);
        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setFloor(roomDetails.getFloor());
        // Add other fields to update if needed
        return roomRepository.save(room);
    }

    public void deleteRoom(Long roomId) {
        Room room = getRoomById(roomId);
        roomRepository.delete(room);
    }
}

