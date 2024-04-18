package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shiftbackend.shiftbackend.Shift.DutyLevel;

import java.util.Map;

@RestController
@RequestMapping("/ra")
@CrossOrigin(origins = "*")
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
        ra.loadAccountFile(id);
        ra.deleteUser();
        ra.deleteAccountFile();
        ra.deleteUserInformation();
        ra = new ResidentAssistant();
        return new ResponseEntity<String>("Deleted User: " + id, HttpStatus.OK);
    }

    @PostMapping("/{id}/set-name")
    public ResponseEntity<String> setNameRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setName(input.get("name"));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Name Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-email")
    public ResponseEntity<String> setEmailRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setEmail(input.get("email"));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Email Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-gender")
    public ResponseEntity<String> setGenderRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setGender(Person.Gender.valueOf(input.get("gender")));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Gender Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-hall")
    public ResponseEntity<String> setHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setHall(Person.Hall.valueOf(input.get("hall")));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Hall Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable")
    public ResponseEntity<String> enableRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        ra.enableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        ra.disableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setFloor(input.get("floor"));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setName(input.get("name"));
        ra.setEmail(input.get("email"));
        ra.setId(id);
        ra.setGender(Person.Gender.valueOf(input.get("gender")));
        ra.setHall(Person.Hall.valueOf(input.get("hall")));
        ra.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        ra.setFloor(input.get("floor"));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Basic Attributes Set", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/create-account")
    public ResponseEntity<String> createRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setName(input.get("name"));
        ra.setEmail(input.get("email"));
        ra.setId(id);
        ra.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("New RA Account Created", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/clock-in")
    public ResponseEntity<String> clockInRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        ra.clockIn();
        ra.saveAccountFile();
        return new ResponseEntity<String>("Clocked In", HttpStatus.OK);
    }

    @GetMapping("/{id}/clock-out")
    public ResponseEntity<String> clockOutRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        ra.clockOut();
        ra.saveAccountFile();
        return new ResponseEntity<String>("Clocked Out", HttpStatus.OK);
    }

    @PostMapping("/{id}/set-timezone")
    public ResponseEntity<String> setTimezoneRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.setTimezone(Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Timezone Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/clear-preferences")
    public ResponseEntity<String> clearPreferencesRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        ra.clearPreferences();
        ra.saveAccountFile();
        return new ResponseEntity<String>("Preferences Cleared", HttpStatus.OK);
    }

    @PostMapping("/{id}/add-preference")
    public ResponseEntity<String> addPreferenceRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.addPreference(input.get("preference"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Preference Added", HttpStatus.OK);
    }

    @GetMapping("/{id}/get-preferences")
    public ResponseEntity<String[]> getPreferencesRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        return new ResponseEntity<String[]>(ra.preferencesString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-events")
    public ResponseEntity<String[]> getEventsRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        return new ResponseEntity<String[]>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-shifts")
    public ResponseEntity<String[]> getShiftsRA(@PathVariable String id) {
        ra.loadAccountFile(id);
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-event/{eventId}")
    public ResponseEntity<String> deleteEventRA(@PathVariable String id, @PathVariable String eventId) {
        ra.loadAccountFile(id);
        ra.getSchedule().deleteEvent(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-day")
    public ResponseEntity<String> deleteEventDayRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().deleteEventDay(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Day", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-week")
    public ResponseEntity<String> deleteEventWeekRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().deleteEventWeek(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Week", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-month")
    public ResponseEntity<String> deleteEventMonthRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().deleteEventMonth(Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Month", HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-title")
    public ResponseEntity<String> editEventTitleRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().editEventTitle(eventId, input.get("title"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Title: " + input.get("title"), HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-description")
    public ResponseEntity<String> editEventDescriptionRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().editEventTitle(eventId, input.get("description"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Description: " + input.get("description"), HttpStatus.OK);
    }

    @PostMapping("/{id}/edit-event/{eventId}/edit-duty-level")
    public ResponseEntity<String> editEventDutyLevelRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ra.getSchedule().editEventTitle(eventId, input.get("dutyLevel"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Duty Level: " + input.get("dutyLevel"), HttpStatus.OK);
    }

    @PostMapping("/{id}/add-event/{eventId}")
    public ResponseEntity<String[]> addEventRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endTimezone")));
        ra.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, (input.get("dutyLevel").equals("null")) ? null :Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        ra.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @PostMapping("/{id}/add-shift/{eventId}")
    public ResponseEntity<String[]> addShiftRA(@PathVariable String id, @PathVariable String eventId) {
        ra.loadAccountFile(id);
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(ra.getReaId());
        

        String title = rea.getSchedule().getEvent(eventId).getTitle();
        String description = rea.getSchedule().getEvent(eventId).getDescription();
        TimeBlock startTime = rea.getSchedule().getEvent(eventId).getStart();
        TimeBlock endTime = rea.getSchedule().getEvent(eventId).getEnd();
        DutyLevel dutyLevel = rea.getSchedule().getEvent(eventId).getDutyLevel();

        rea.getSchedule().getEvent(eventId).decAvailability();

        ra.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, dutyLevel));
        rea.saveAccountFile();
        ra.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/request-drop/{eventId}")
    public ResponseEntity<String[]> requestShiftDropRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(ra.getReaId());

        rea.getSchedule().getEvent(eventId).incAvailability();

        rea.saveAccountFile();
        ra.addShiftDropRequest(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/request-drop-delete/{eventId}")
    public ResponseEntity<String[]> requestShiftDropDeleteRA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ra.loadAccountFile(id);
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(ra.getReaId());

        rea.getSchedule().getEvent(eventId).incAvailability();

        rea.saveAccountFile();
        ra.deleteShiftDropRequest(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/find-user-in-hall")
    public ResponseEntity<String> findIdsInHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        
        StringBuilder buffer = new StringBuilder();
        buffer.append("{ \"raIds\" : ");
        buffer.append(ra.findInHall("RA", input.get("hall")));
        buffer.append("\n\"reaIds\" : ");
        buffer.append(ra.findInHall("REA", input.get("hall")));
        buffer.append("\n\"recIds\" : ");
        buffer.append(ra.findInHall("REC", input.get("hall")));
        buffer.append(" }");
        
        return new ResponseEntity<String>(buffer.toString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/report-ra/{raId}")
    public ResponseEntity<String> reportRAInRA(@PathVariable String id, @PathVariable String raId) {
        
        ra.loadAccountFile(raId);
        ra.reportUser();
        ra.saveAccountFile();
        
        return new ResponseEntity<String>("RA Id: " + raId + " Reported", HttpStatus.OK);
    }

    @GetMapping("/{id}/report-rea/{reaId}")
    public ResponseEntity<String> reportREAInRA(@PathVariable String id, @PathVariable String reaId) {
        
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.reportUser();
        rea.saveAccountFile();
        
        return new ResponseEntity<String>("REA Id: " + reaId + " Reported", HttpStatus.OK);
    }

}