package com.manager.ashrey.controllerTest;

import com.manager.ashrey.entity.Caretaker;
import com.manager.ashrey.service.CaretakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/caretakers")
public class CaretakerController {

    @Autowired
    private CaretakerService caretakerService;

    @PostMapping(value = "/add-caretaker")
    public ResponseEntity<Caretaker> createCaretaker(@RequestBody Caretaker caretaker) {
        Caretaker newCaretaker = caretakerService.createCaretaker(caretaker);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCaretaker);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Caretaker> getCaretakerById(@PathVariable Long id) {
        Caretaker caretaker = caretakerService.getCaretakerById(id);
        return ResponseEntity.ok(caretaker);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteCaretaker(@PathVariable Long id) {
        caretakerService.deleteCaretaker(id);
        return ResponseEntity.noContent().build();
    }
}

