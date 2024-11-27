package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hostel")
public class Hostel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostelId;

//    @Enumerated(EnumType.STRING)
    private String hostelName;

    @OneToMany(mappedBy = "hostel", cascade = CascadeType.ALL)
    private Set<Block> blocks;

}

