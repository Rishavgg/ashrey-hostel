package com.manager.ashrey.controllerTest;

import com.manager.ashrey.entity.Warden;
import com.manager.ashrey.service.WardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wardens")
public class WardenController {

    @Autowired
    private WardenService wardenService;

    @PostMapping(value = "/add-warden")
    public ResponseEntity<Warden> createWarden(@RequestBody Warden warden) {
        Warden newWarden = wardenService.createWarden(warden);
        return ResponseEntity.status(HttpStatus.CREATED).body(newWarden);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Warden> getWardenById(@PathVariable Long id) {
        Warden warden = wardenService.getWardenById(id);
        return ResponseEntity.ok(warden);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteWarden(@PathVariable Long id) {
        wardenService.deleteWarden(id);
        return ResponseEntity.noContent().build();
    }
}

