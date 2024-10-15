package com.manager.ashrey.service;

import com.manager.ashrey.entity.Room;

import java.util.List;

public interface RoomService {

    public Room createRoom(Room room);

    public Room getRoomById(Long roomId);
    public List<Room> getRoomsByHostel(Long hostelId);

    public Room updateRoom(Long roomId, Room roomDetails);

    public void deleteRoom(Long roomId);

}
