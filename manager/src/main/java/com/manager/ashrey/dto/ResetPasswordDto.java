package com.manager.ashrey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResetPasswordDto {
    private String rollNumber;
    private String oldPassword;
    private String password;
}
