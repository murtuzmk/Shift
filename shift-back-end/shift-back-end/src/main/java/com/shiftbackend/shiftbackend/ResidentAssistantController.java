package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ra")
public class ResidentAssistantController {

    private String myId;

    @GetMapping
    public ResponseEntity<String> allRAs() {
        return new ResponseEntity<String>("All RA's", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getId(@PathVariable String id) {
        return new ResponseEntity<String>(id, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<String> getInput(@PathVariable String id) {
        return new ResponseEntity<String>(id, HttpStatus.OK);
    }

    @PostMapping("/input")
    public ResponseEntity<String> setInput(@RequestBody Map<String, String> inputId) {
        myId = inputId.get("inputId");
        return new ResponseEntity<String>(myId, HttpStatus.CREATED);
    }

}