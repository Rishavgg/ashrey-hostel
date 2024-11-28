package com.manager.ashrey.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HostelDTO {
    private Long hostelId;
    private String hostelName;


    public HostelDTO(Long hostelId, String hostelName, Object o) {
        this.hostelId = hostelId;
        this.hostelName = hostelName;
    }
}
