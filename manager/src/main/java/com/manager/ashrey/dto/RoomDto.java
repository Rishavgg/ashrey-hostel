package com.manager.ashrey.dto;
import com.manager.ashrey.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomDto {
    private String roomNumber;
    private RoomType type; // Either "SINGLE" or "DOUBLE"
    private Long blockId; // ID of the block to which this room belongs
    private boolean empty = true;
}
