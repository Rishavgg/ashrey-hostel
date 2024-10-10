package com.manager.ashrey.service;

import com.manager.ashrey.entity.Caretaker;

public interface CaretakerService {
    public Caretaker createCaretaker(Caretaker caretaker);

    public Caretaker getCaretakerById(Long caretakerId);
    public void deleteCaretaker(Long caretakerId);
}
