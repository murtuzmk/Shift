package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rea")
public class ResidentEducationAssistantController {
    ResidentEducationAssistant rea = new ResidentEducationAssistant();

    @GetMapping("/{id}")
    public ResponseEntity<String> loadREA(@PathVariable String id) {
        rea.loadAccountFile(id);
        return new ResponseEntity<String>(rea.userString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<String> deleteREA(@PathVariable String id) {
        rea.deleteAccountFile();
        rea.deleteUserInformation();
        rea = new ResidentEducationAssistant();
        return new ResponseEntity<String>("Deleted User: " + id, HttpStatus.OK);
    }

    @PostMapping("/{id}/set-name")
    public ResponseEntity<String> setNameREA(@RequestBody Map<String, String> input) {
        rea.setName(input.get("name"));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Name Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-email")
    public ResponseEntity<String> setEmailREA(@RequestBody Map<String, String> input) {
        rea.setEmail(input.get("email"));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Email Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-gender")
    public ResponseEntity<String> setGenderREA(@RequestBody Map<String, String> input) {
        rea.setGender(Person.Gender.valueOf(input.get("gender")));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Gender Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-hall")
    public ResponseEntity<String> setHallREA(@RequestBody Map<String, String> input) {
        rea.setHall(Person.Hall.valueOf(input.get("hall")));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Hall Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable")
    public ResponseEntity<String> enableREA(@PathVariable String id) {
        rea.enableAccount();
        rea.saveAccountFile();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableREA(@PathVariable String id) {
        rea.disableAccount();
        rea.saveAccountFile();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorREA(@RequestBody Map<String, String> input) {
        rea.setFloor(input.get("floor"));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputREA(@RequestBody Map<String, String> input) {
        rea.setName(input.get("name"));
        rea.setEmail(input.get("email"));
        rea.setId(input.get("inputId"));
        rea.setGender(Person.Gender.valueOf(input.get("gender")));
        rea.setHall(Person.Hall.valueOf(input.get("hall")));
        rea.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        rea.setFloor(input.get("floor"));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Basic Attributes Set", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/create-ra/{raId}")
    public ResponseEntity<String> createRAInREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.setId(raId);
        ra.saveAccountFile();

        rea.addRaAccount(raId);
        rea.saveAccountFile();

        return new ResponseEntity<String>("RA Added: " + raId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra/{raId}/get-events")
    public ResponseEntity<String> getEventsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/get-shifts")
    public ResponseEntity<String> getShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-event/{eventId}")
    public ResponseEntity<String> deleteEventREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteEvent(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-title")
    public ResponseEntity<String> editEventTitleREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("title"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Title: " + input.get("title"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-description")
    public ResponseEntity<String> editEventDescriptionREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("description"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Description: " + input.get("description"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-duty-level")
    public ResponseEntity<String> editEventDutyLevelREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("dutyLevel"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Duty Level: " + input.get("dutyLevel"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/add-event/{eventId}")
    public ResponseEntity<String> addEventREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

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

    @PostMapping("/{id}/create-shift/{eventId}")
    public ResponseEntity<String> createShiftRA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endzone")));

                                          
        rea.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        rea.saveAccountFile();
        return new ResponseEntity<String>(rea.getSchedule().getEvents(), HttpStatus.OK);
    }

}
