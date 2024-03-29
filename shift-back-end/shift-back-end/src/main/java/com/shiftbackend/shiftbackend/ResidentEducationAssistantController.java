package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rea")
public class ResidentEducationAssistantController {
    ResidentEducationAssistant rea = new ResidentEducationAssistant();

    @GetMapping
    public ResponseEntity<String> allREAs() {
        return new ResponseEntity<String>("Access REA Methods", HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<String> loadREA(@PathVariable String id) {
        rea.loadAccountFile(id);
        return new ResponseEntity<String>(rea.userString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<String> deleteREA(@PathVariable String id) {
        rea.loadAccountFile(id);
        rea.deleteUser();
        rea.deleteAccountFile();
        rea.deleteUserInformation();
        rea = new ResidentEducationAssistant();
        return new ResponseEntity<String>("Deleted User: " + id, HttpStatus.OK);
    }

    @PostMapping("/{id}/set-name")
    public ResponseEntity<String> setNameREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setName(input.get("name"));
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Name Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-email")
    public ResponseEntity<String> setEmailREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setEmail(input.get("email"));
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Email Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-gender")
    public ResponseEntity<String> setGenderREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setGender(Person.Gender.valueOf(input.get("gender")));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Gender Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-hall")
    public ResponseEntity<String> setHallREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setHall(Person.Hall.valueOf(input.get("hall")));
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Hall Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/is-ra-clocked-in/{raId}")
    public ResponseEntity<String> isRAClockedInREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        
        return new ResponseEntity<String>("" + ra.isClockedIn(), HttpStatus.OK);
    }

    @GetMapping("/{id}/enable")
    public ResponseEntity<String> enableREA(@PathVariable String id) {
        rea.loadAccountFile(id);
        rea.enableAccount();
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable-ra/{raId}")
    public ResponseEntity<String> enableRAFromREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.enableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableREA(@PathVariable String id) {
        rea.loadAccountFile(id);
        rea.disableAccount();
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable-ra/{raId}")
    public ResponseEntity<String> disableRAFromREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.disableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setFloor(input.get("floor"));
        rea.saveAccountFile();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setName(input.get("name"));
        rea.setEmail(input.get("email"));
        rea.setId(input.get("inputId"));
        rea.setGender(Person.Gender.valueOf(input.get("gender")));
        rea.setHall(Person.Hall.valueOf(input.get("hall")));
        rea.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        rea.setFloor(input.get("floor"));
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Basic Attributes Set", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/create-account")
    public ResponseEntity<String> createREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.setName(input.get("name"));
        rea.setEmail(input.get("email"));
        rea.setId(input.get("inputId"));
        rea.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        rea.saveAccountFile();
        rea.addUser();
        rea.addUser();

        return new ResponseEntity<String>("New REA Account Created", HttpStatus.CREATED);
    }


    @GetMapping("/{id}/add-ra/{raId}")
    public ResponseEntity<String> addRAInREA(@PathVariable String id, @PathVariable String raId) {
        rea.loadAccountFile(id);

        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.setReaId(id);
        ra.saveAccountFile();

        rea.addRaAccount(raId);
        rea.saveAccountFile();

        return new ResponseEntity<String>("RA Added: " + raId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/remove-ra/{raId}")
    public ResponseEntity<String> removeRAInREA(@PathVariable String id, @PathVariable String raId) {
        rea.loadAccountFile(id);

        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.setReaId(null);
        ra.saveAccountFile();

        rea.removeRaAccount(raId);
        rea.saveAccountFile();

        return new ResponseEntity<String>("RA Removed: " + raId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/get-ras")
    public ResponseEntity<String> getRAsInREA(@PathVariable String id) {
        rea.loadAccountFile(id);

        return new ResponseEntity<String>(rea.getRAs(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-primary/{raId}")
    public ResponseEntity<String> completedRAprimaryShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Primary Shifts Completed: " + ra.primaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-secondary/{raId}")
    public ResponseEntity<String> completedRAsecondaryShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Secondary Shifts Completed: " + ra.secondaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-tertiary/{raId}")
    public ResponseEntity<String> completedRAtertiaryShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Tertiary Shifts Completed: " + ra.tertiaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-stats/{raId}")
    public ResponseEntity<String> completedRAShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Total Shifts Completed: " + ra.totalShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra/{raId}/get-events")
    public ResponseEntity<String> getRAEventsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/get-shifts")
    public ResponseEntity<String> getRAShiftsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-event/{eventId}")
    public ResponseEntity<String> deleteRAEventREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteEvent(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-day")
    public ResponseEntity<String> deleteEventDayRAFromREA(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventDay(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Day", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-week")
    public ResponseEntity<String> deleteEventWeekRAFromREA(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventWeek(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Week", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-month")
    public ResponseEntity<String> deleteEventMonthRAFromREA(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventMonth(Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Month", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-title")
    public ResponseEntity<String> editRAEventTitleREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("title"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Title: " + input.get("title"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-description")
    public ResponseEntity<String> editRAEventDescriptionREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("description"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Description: " + input.get("description"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-duty-level")
    public ResponseEntity<String> editRAEventDutyLevelREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("dutyLevel"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Duty Level: " + input.get("dutyLevel"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/add-event/{eventId}")
    public ResponseEntity<String> addRAEventREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

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
        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/add-shift/{eventId}")
    public ResponseEntity<String> addRAShiftREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

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
        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/view-drop-requests/{eventId}")
    public ResponseEntity<String> viewRAShiftDropsREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.saveAccountFile();
        return new ResponseEntity<String>(ra.getShiftDropRequests(), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/deny-drop/{eventId}")
    public ResponseEntity<String> denyRADropREA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(id);
        ra.deleteShiftDropRequest(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Drop Denied for Event: " + eventId, HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-shift/{eventId}")
    public ResponseEntity<String> deleteRAShiftREA(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteShift(eventId);
        ra.deleteShiftDropRequest(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-shift/{eventId}")
    public ResponseEntity<String> createRAShiftREA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
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

    @PostMapping("/{id}/create-event/{eventId}")
    public ResponseEntity<String> createEventREA(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);

        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endTimezone")));
        rea.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, (input.get("dutyLevel").equals("null")) ? null :Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        rea.saveAccountFile();
        return new ResponseEntity<String>(rea.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-event/{eventId}")
    public ResponseEntity<String> deleteEventREA(@PathVariable String id, @PathVariable String eventId) {
        rea.loadAccountFile(id);

        rea.getSchedule().deleteEvent(eventId);
        rea.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-day")
    public ResponseEntity<String> deleteEventDayREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.getSchedule().deleteEventDay(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("timezone")));
        rea.saveAccountFile();
        return new ResponseEntity<String>("Deleted Day", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-week")
    public ResponseEntity<String> deleteEventWeekREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.getSchedule().deleteEventWeek(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        rea.saveAccountFile();
        return new ResponseEntity<String>("Deleted Week", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-month")
    public ResponseEntity<String> deleteEventMonthREA(@PathVariable String id, @RequestBody Map<String, String> input) {
        rea.loadAccountFile(id);
        rea.getSchedule().deleteEventMonth(Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        rea.saveAccountFile();
        return new ResponseEntity<String>("Deleted Month", HttpStatus.OK);
    }

}
