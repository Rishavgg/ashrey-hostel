package com.manager.ashrey.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "year")
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer yearId;

    private String yearName;
}
