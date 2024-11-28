package com.manager.ashrey.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomFilterDTO {

    private Boolean singleRoom = null;  // default null
    private Boolean sunlight = null;    // default null
    private Boolean balcony = null;     // default null
    private int level = 0;              // default 0
    private int floor = 0;              // default 0

    // You can also add page and size as parameters here if you want them in the request body
    private int page = 0;               // default 0
    private int size = 10;              // default 10
}

