package com.ashrey.student_service.model;

import com.ashrey.student_service.enums.Branch;
import com.ashrey.student_service.enums.Degree;
import com.ashrey.student_service.enums.Gender;
import jakarta.annotation.Resource;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "STUDENT")
public class Student {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "parentId")
//    private Parent parent;

    private String name;
    private String rollNumber;
    private String email;
//    private String password;
    private String phoneNumber;
    private String admissionYear;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Degree degree;
    private float cgpa;

    @Enumerated(EnumType.STRING)
    private Branch branch;


}
// service to get hostelId by hostel Name
// service to get roomId by room number and hostel Name
// service to insert student through excel sheet
// service to update student details by excel sheet
// service to get studentID by student roll number