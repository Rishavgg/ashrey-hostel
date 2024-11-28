package com.manager.ashrey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long studentId;
    private String name;
    private String email;
    private String rollNumber;
    private String contact;
    private String roomType; // Single/Double
    private int year; // Admission year
    private String roomNumber;
    private String hostelName;
    private Long roomId;
    private Long hostelId;
}
