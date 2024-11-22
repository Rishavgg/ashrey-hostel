package com.manager.ashrey.response;

import lombok.Data;

@Data
public class ResponseDTO {
    private String message;
    private Object body;

    public ResponseDTO(String message) {
        this.message = message;
    }
    public ResponseDTO(Object body) { this.body = body; }

    public ResponseDTO(String message, Object body) {
        this.message = message;
        this.body = body;
    }
}
