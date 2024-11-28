package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public boolean isRoomExists(String roomNumber, Long hostelId) {
        return roomRepository.existsByRoomNumberAndHostel_HostelId(roomNumber, hostelId);
    }

    @Override
    public Room createRoom(RoomDTO roomDto) {
        Hostel hostel = hostelRepository.findById(roomDto.getHostelId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid hostel ID: " + roomDto.getHostelId()));

        Room room = new Room();
        room.setRoomNumber(roomDto.getRoomNumber());
        room.setCapacity(roomDto.getCapacity());
        room.setCurrentOccupancy(roomDto.getCurrentOccupancy());
        room.setFloor(roomDto.getFloor());
        room.setLevel(roomDto.getLevel());
        room.setSunlight(roomDto.isSunlight());
        room.setBalcony(roomDto.isBalcony());
        room.setHostel(hostel);

        return roomRepository.save(room);
    }
}