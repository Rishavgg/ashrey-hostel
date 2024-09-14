package com.ashrey.Room_Management_Service.enums;

public enum RoomCapacity {
    SINGLE(1),
    DOUBLE(2),
    TRIPLE(3);

    private final int capacity;

    RoomCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCapacity() {
        return capacity;
    }
}
