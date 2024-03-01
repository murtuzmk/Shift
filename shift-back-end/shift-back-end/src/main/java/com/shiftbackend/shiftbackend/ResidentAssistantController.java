package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ra")
public class ResidentAssistantController {

    ResidentAssistant ra = new ResidentAssistant();

    @GetMapping
    public ResponseEntity<String> allRAs() {
        return new ResponseEntity<String>("All RA's", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> loadRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        return new ResponseEntity<String>(ra.userString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<String> deleteRA(@PathVariable String id) {
        ra.deleteAccountFile();
        ra.deleteUserInformation();
        ra = new ResidentAssistant();
        return new ResponseEntity<String>("Deleted User: " + id, HttpStatus.OK);
    }

    @GetMapping("/{id}/get-events")
    public ResponseEntity<String> getEventsRA(@PathVariable String id) {
        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInput(@RequestBody Map<String, String> input) {
        ra.setName(input.get("name"));
        ra.setEmail(input.get("email"));
        ra.setId(input.get("inputId"));
        ra.setGender(Person.Gender.valueOf(input.get("gender")));
        ra.setHall(Person.Hall.valueOf(input.get("hall")));
        ra.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        ra.setFloor(input.get("floor"));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Basic Attributes Set", HttpStatus.CREATED);
    }

}