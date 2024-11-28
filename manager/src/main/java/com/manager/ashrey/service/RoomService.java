package com.manager.ashrey.service;

import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.entity.Room;

public interface RoomService {

    boolean isRoomExists(String roomNumber, Long hostelId);

    Room createRoom(RoomDTO roomDto);
}
