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
        return new ResponseEntity<String>("Access RA Methods", HttpStatus.OK);
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

    @PostMapping("/{id}/set-name")
    public ResponseEntity<String> setNameRA(@RequestBody Map<String, String> input) {
        ra.setName(input.get("name"));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Name Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-email")
    public ResponseEntity<String> setEmailRA(@RequestBody Map<String, String> input) {
        ra.setEmail(input.get("email"));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Email Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-gender")
    public ResponseEntity<String> setGenderRA(@RequestBody Map<String, String> input) {
        ra.setGender(Person.Gender.valueOf(input.get("gender")));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Gender Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-hall")
    public ResponseEntity<String> setHallRA(@RequestBody Map<String, String> input) {
        ra.setHall(Person.Hall.valueOf(input.get("hall")));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Hall Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable")
    public ResponseEntity<String> enableRA(@PathVariable String id) {
        ra.enableAccount();
        ra.saveAccountFile();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableRA(@PathVariable String id) {
        ra.disableAccount();
        ra.saveAccountFile();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorRA(@RequestBody Map<String, String> input) {
        ra.setFloor(input.get("floor"));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputRA(@RequestBody Map<String, String> input) {
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

    @GetMapping("/{id}/clear-preferences")
    public ResponseEntity<String> clearPreferencesRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.clearPreferences();
        ra.saveAccountFile();
        return new ResponseEntity<String>("Preferences Cleared: ", HttpStatus.OK);
    }

    @PostMapping("/{id}/add-preference")
    public ResponseEntity<String> addPreferenceRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.addPreferences(input.get("preference"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Preference Added: " + input.get("preference"), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-events")
    public ResponseEntity<String> getEventsRA(@PathVariable String id) {
        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-shifts")
    public ResponseEntity<String> getShiftsRA(@PathVariable String id) {
        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-event/{eventId}")
    public ResponseEntity<String> deleteEventRA(@PathVariable String id, @PathVariable String eventId) {
        ra.getSchedule().deleteEvent(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-title")
    public ResponseEntity<String> editEventTitleRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.getSchedule().editEventTitle(eventId, input.get("title"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Title: " + input.get("title"), HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-description")
    public ResponseEntity<String> editEventDescriptionRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.getSchedule().editEventTitle(eventId, input.get("description"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Description: " + input.get("description"), HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-duty-level")
    public ResponseEntity<String> editEventDutyLevelRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.getSchedule().editEventTitle(eventId, input.get("dutyLevel"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Duty Level: " + input.get("dutyLevel"), HttpStatus.OK);
    }

    @PostMapping("/{id}/add-event/{eventId}")
    public ResponseEntity<String> addEventRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endzone")));
        ra.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        ra.saveAccountFile();
        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

}