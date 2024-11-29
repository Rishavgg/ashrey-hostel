package com.manager.ashrey.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddStudentDto {
    private String name;
    private String email;
    private String rollNumber;
    private String contact;
    private String roomType; // "SINGLE" or "DOUBLE"
    private Long hostelId;    // Selected hostel
    private Long blockId;     // Selected block
    private Long roomId;    // Selected available room
    private int admissionYear;
}
