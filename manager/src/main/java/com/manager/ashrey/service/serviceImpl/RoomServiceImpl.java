package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.RoomDto;
import com.manager.ashrey.entity.Block;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.repository.BlockRepository;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BlockRepository blockRepository;

    public Room createRoom(RoomDto roomDto) {
        Room room = new Room();
        room.setRoomNumber(roomDto.getRoomNumber());
        room.setType(roomDto.getType());
        room.setEmpty(true);

        Block block = blockRepository.findById(roomDto.getBlockId())
                .orElseThrow(() -> new RuntimeException("Block not found"));
        room.setBlock(block);

        return roomRepository.save(room);
    }
}
