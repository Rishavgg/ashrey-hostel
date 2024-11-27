package com.manager.ashrey.service;

import com.manager.ashrey.dto.RoomDto;
import com.manager.ashrey.entity.Room;

public interface RoomService {

    Room createRoom(RoomDto roomDto);
}
