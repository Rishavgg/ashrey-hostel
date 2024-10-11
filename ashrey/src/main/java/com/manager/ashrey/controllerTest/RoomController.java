package com.manager.ashrey.controllerTest;

import com.manager.ashrey.entity.Room;
import com.manager.ashrey.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping(value = "/add-room")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room newRoom = roomService.createRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRoom);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    @GetMapping(value = "/hostel/{hostelId}")
    public ResponseEntity<List<Room>> getRoomsByHostel(@PathVariable Long hostelId) {
        List<Room> rooms = roomService.getRoomsByHostel(hostelId);
        return ResponseEntity.ok(rooms);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room updatedRoom = roomService.updateRoom(id, roomDetails);
        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

