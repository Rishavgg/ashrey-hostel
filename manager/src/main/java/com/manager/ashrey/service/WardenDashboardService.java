package com.manager.ashrey.service;

import com.manager.ashrey.dto.RoomDTO;
import com.manager.ashrey.dto.RoomFilterDTO;
import com.manager.ashrey.dto.StudentDTO;
import com.manager.ashrey.entity.Room;
import com.manager.ashrey.entity.Student;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WardenDashboardService {

//    Page<Student> getAllStudents (int page, int size);
//
//    Page<Student> searchStudents(String searchTerm, int page, int size);


    Page<StudentDTO> getAllStudentDTOs(int page, int size);

    Page<StudentDTO> searchStudentDTOs(String searchTerm, int page, int size);

    StudentDTO convertToDTO(Student student);

    Page<RoomDTO> getFilteredRooms(Long hostelId, Boolean singleRoom, Boolean sunlight, Boolean balcony, int level, int floor, int page, int size);

    boolean assignRoomToStudent(Long studentId, Long roomId);


    boolean reassignRoomToStudent(Long studentId, Long roomId);
}
