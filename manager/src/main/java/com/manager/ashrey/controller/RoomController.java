package com.manager.ashrey.controller;

import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

//    @PostMapping(value = "/addRoom")
//    public Room createRoom(@RequestBody RoomDto roomDto) {
//        return roomService.createRoom(roomDto);
//    }

//    @GetMapping("/availableRooms")
//    public List<Room> getAvailableRooms(
//            @RequestParam Long hostelId,
//            @RequestParam Long blockId,
//            @RequestParam String roomType) {

//        RoomType type;
//        try {
//            type = RoomType.valueOf(roomType.toUpperCase());
//        } catch (IllegalArgumentException e) {
//            throw new RuntimeException("Invalid room type provided: " + roomType);
//        }
//        return roomRepository.findAvailableRooms(hostelId, blockId, roomType);
//    }
// }
