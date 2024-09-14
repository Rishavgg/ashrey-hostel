package com.ashrey.student_service.customizedException;

public class ResourceNotFoundException extends Exception {
    public ResourceNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
