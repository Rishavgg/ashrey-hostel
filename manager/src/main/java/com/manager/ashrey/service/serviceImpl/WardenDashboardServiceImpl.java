package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.dto.StudentDTO;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.entity.Student;
import com.manager.ashrey.repository.RoomRepository;
import com.manager.ashrey.repository.StudentRepository;
import com.manager.ashrey.service.WardenDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WardenDashboardServiceImpl implements WardenDashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

//    @Override
//    public Page<Student> getAllStudents(int page, int size) {
//        return studentRepository.findAll(PageRequest.of(page, size));
//    }
//
//
//    @Override
//    public Page<Student> searchStudents(String searchTerm, int page, int size) {
//        return studentRepository.findByRollNumberOrName(searchTerm ,PageRequest.of(page, size));
//    }

    @Override
    public Page<StudentDTO> getAllStudentDTOs(int page, int size) {
        Page<Student> students = studentRepository.findAll(PageRequest.of(page, size));
        return students.map(this::convertToDTO);
    }

    @Override
    public Page<StudentDTO> searchStudentDTOs(String searchTerm, int page, int size) {
        Page<Student> students = studentRepository.findByRollNumberOrName(searchTerm ,PageRequest.of(page, size));
        return students.map(this::convertToDTO);
    }

    @Override
    public StudentDTO convertToDTO(Student student) {
        // Get the current year
        int currentYear = LocalDate.now().getYear();
        int currentMonth = LocalDate.now().getMonthValue();

        // Determine if the academic year has started yet
        int academicYear;
        if (currentMonth < 7) {
            academicYear = currentYear - student.getAdmissionYear(); // Before July, the academic year is based on the previous year
        } else {
            academicYear = currentYear - student.getAdmissionYear() + 1; // After July, the academic year is based on the current year
        }

        // Get room type (Single/Double) based on room capacity or null if no room is assigned
        String roomType = null;
        String roomNumber = null;
        String hostelName = null;
        Long roomId = null;
        Long hostelId = null;

        if (student.getRoom() != null) {
            // If student has a room assigned
            roomType = student.getRoom().getCapacity() == 1 ? "Single" : "Double";
            roomNumber = student.getRoom().getRoomNumber();
            hostelName = student.getRoom().getHostel().getHostelName();
            roomId = student.getRoom().getRoomId();
            hostelId = student.getRoom().getHostel().getHostelId();
        }

        // Return a new StudentDTO with the required fields (null for the room and hostel fields if not assigned)
        return new StudentDTO(
                student.getStudentId(),
                student.getName(),
                student.getEmail(),
                student.getRollNumber(),
                student.getContact(),
                roomType,
                academicYear, // Send the calculated academic year
                roomNumber,
                hostelName,
                roomId,
                hostelId
        );
    }



    @Override
    public Page<RoomDTO> getFilteredRooms(Long hostelId, Boolean singleRoom, Boolean sunlight, Boolean balcony, int level, int floor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Room> rooms;

        if (singleRoom != null) {
            int capacity = singleRoom ? 1 : 2;
            rooms = roomRepository.findAvailableRoomsByHostelIdAndCapacity(hostelId, capacity, pageable);
        } else {
            rooms = roomRepository.findAvailableRoomsByHostelId(hostelId, pageable);
        }

        // Get the list of rooms
        List<Room> roomList = rooms.getContent();

        // Apply additional filters manually
        if (sunlight != null) {
            roomList = roomList.stream().filter(room -> room.getSunlight().equals(sunlight)).collect(Collectors.toList());
        }
        if (balcony != null) {
            roomList = roomList.stream().filter(room -> room.getBalcony().equals(balcony)).collect(Collectors.toList());
        }
        if (level > 0) {
            roomList = roomList.stream().filter(room -> room.getLevel() == level).collect(Collectors.toList());
        }
        if (floor > 0) {
            roomList = roomList.stream().filter(room -> room.getFloor() == floor).collect(Collectors.toList());
        }

        // Convert Room entities to RoomDTOs
        List<RoomDTO> roomDTOs = roomList.stream()
                .map(room -> new RoomDTO(
                        room.getRoomId(),
                        room.getRoomNumber(),
                        room.getCapacity(),
                        room.getCurrentOccupancy(),
                        room.getSunlight(),
                        room.getBalcony(),
                        room.getLevel(),
                        room.getFloor()
                ))
                .collect(Collectors.toList());

        // Return the filtered list wrapped as a Page
        return new PageImpl<>(roomDTOs, pageable, rooms.getTotalElements());
    }

    @Override
    public Page<RoomDTO> getFilteredRoomsAcrossHostels(Boolean singleRoom, Boolean sunlight, Boolean balcony, int level, int floor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Room> rooms;

        if (singleRoom != null) {
            int capacity = singleRoom ? 1 : 2;
            rooms = roomRepository.findAvailableRoomsByCapacity(capacity, pageable);
        } else {
            rooms = roomRepository.findAllAvailableRooms(pageable);
        }

        // Get the list of rooms
        List<Room> roomList = rooms.getContent();

        // Apply additional filters manually
        if (sunlight != null) {
            roomList = roomList.stream().filter(room -> room.getSunlight().equals(sunlight)).collect(Collectors.toList());
        }
        if (balcony != null) {
            roomList = roomList.stream().filter(room -> room.getBalcony().equals(balcony)).collect(Collectors.toList());
        }
        if (level > 0) {
            roomList = roomList.stream().filter(room -> room.getLevel() == level).collect(Collectors.toList());
        }
        if (floor > 0) {
            roomList = roomList.stream().filter(room -> room.getFloor() == floor).collect(Collectors.toList());
        }

        // Convert Room entities to RoomDTOs
        List<RoomDTO> roomDTOs = roomList.stream()
                .map(room -> new RoomDTO(
                        room.getRoomId(),
                        room.getRoomNumber(),
                        room.getCapacity(),
                        room.getCurrentOccupancy(),
                        room.getSunlight(),
                        room.getBalcony(),
                        room.getLevel(),
                        room.getFloor()
                ))
                .collect(Collectors.toList());

        // Return the filtered list wrapped as a Page
        return new PageImpl<>(roomDTOs, pageable, rooms.getTotalElements());
    }




    @Override
    public boolean assignRoomToStudent(Long studentId, Long roomId) {
        // Fetch the room and student
        Room room = roomRepository.findById(roomId).orElse(null);
        Student student = studentRepository.findById(studentId).orElse(null);

        // Check if either room or student is null, or if the room is fully occupied
        if (room == null || student == null || room.getCurrentOccupancy() >= room.getCapacity()) {
            return false;
        }

        // Check if the student is already assigned to the given room
        if (student.getRoom() != null && student.getRoom().getRoomId().equals(roomId)) {
            return false;  // Student is already assigned to the same room
        }

        // Assign room to the student
        student.setRoom(room);
        room.setCurrentOccupancy(room.getCurrentOccupancy() + 1);

        // Save updates
        studentRepository.save(student);
        roomRepository.save(room);

        return true;
    }

    @Override
    public boolean reassignRoomToStudent(Long studentId, Long roomId) {
        // Fetch the room and students
        Room room = roomRepository.findById(roomId).orElse(null);
        Student student = studentRepository.findById(studentId).orElse(null);

        // Check if the room or student does not exist
        if (room == null || student == null) {
            return false;
        }

        // If the room is already fully occupied
        if (room.getCurrentOccupancy() >= room.getCapacity()) {
            return false;
        }

        // Check if the student is already assigned to this room
        if (student.getRoom() != null && student.getRoom().getRoomId().equals(roomId)) {
            return false;  // Student is already assigned to the same room
        }

        // If the student is already assigned to another room, deallocate that room
        if (student.getRoom() != null) {
            Room currentRoom = student.getRoom();
            currentRoom.setCurrentOccupancy(currentRoom.getCurrentOccupancy() - 1);
            student.setRoom(null); // Remove the student from the current room
            roomRepository.save(currentRoom); // Save the updated room
        }

        // Assign the new room to the student
        student.setRoom(room);
        room.setCurrentOccupancy(room.getCurrentOccupancy() + 1);

        // Save the student and the room after assigning the new room
        studentRepository.save(student);
        roomRepository.save(room);

        return true;
    }
}
