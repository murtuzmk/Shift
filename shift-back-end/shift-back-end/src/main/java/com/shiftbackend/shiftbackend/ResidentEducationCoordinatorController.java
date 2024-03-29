package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rec")
public class ResidentEducationCoordinatorController {
    ResidentEducationCoordinator rec = new ResidentEducationCoordinator();

    @GetMapping
    public ResponseEntity<String> allRECs() {
        return new ResponseEntity<String>("Access REC Methods", HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<String> loadREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        return new ResponseEntity<String>(rec.userString(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity<String> deleteREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        rec.deleteUser();
        rec.deleteAccountFile();
        rec.deleteUserInformation();
        rec = new ResidentEducationCoordinator();
        return new ResponseEntity<String>("Deleted User: " + id, HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-rea/{reaId}")
    public ResponseEntity<String> deleteREA(@PathVariable String id, @PathVariable String reaId) {
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.deleteUser();
        rea.deleteAccountFile();
        rea.deleteUserInformation();
        rea = new ResidentEducationAssistant();
        return new ResponseEntity<String>("Deleted User: " + reaId, HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-ra/{raId}")
    public ResponseEntity<String> deleteRAinREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.deleteUser();
        ra.deleteAccountFile();
        ra.deleteUserInformation();
        ra = new ResidentAssistant();
        return new ResponseEntity<String>("Deleted User: " + raId, HttpStatus.OK);
    }

    @PostMapping("/{id}/set-name")
    public ResponseEntity<String> setNameREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setName(input.get("name"));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Name Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-email")
    public ResponseEntity<String> setEmailREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setEmail(input.get("email"));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Email Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-gender")
    public ResponseEntity<String> setGenderREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setGender(Person.Gender.valueOf(input.get("gender")));
        rec.saveAccountFile();

        return new ResponseEntity<String>("Gender Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-hall")
    public ResponseEntity<String> setHallREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setHall(Person.Hall.valueOf(input.get("hall")));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Hall Edited", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/is-ra-clocked-in/{raId}")
    public ResponseEntity<String> isRAClockedInREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        
        return new ResponseEntity<String>("" + ra.isClockedIn(), HttpStatus.OK);
    }

    @GetMapping("/{id}/enable")
    public ResponseEntity<String> enableREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        rec.enableAccount();
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable-rea/{reaId}")
    public ResponseEntity<String> enableREAFromREC(@PathVariable String id, @PathVariable String reaId) {
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.enableAccount();
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable-ra/{raId}")
    public ResponseEntity<String> enableRAFromREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.enableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        rec.disableAccount();
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable-rea/{reaId}")
    public ResponseEntity<String> diableREAFromREA(@PathVariable String id, @PathVariable String reaId) {
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.disableAccount();
        rea.saveAccountFile();
        rea.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable-ra/{raId}")
    public ResponseEntity<String> diableRAFromREA(@PathVariable String id) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(id);
        ra.disableAccount();
        ra.saveAccountFile();
        ra.addUser();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setFloor(input.get("floor"));
        rec.saveAccountFile();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setName(input.get("name"));
        rec.setEmail(input.get("email"));
        rec.setId(input.get("inputId"));
        rec.setGender(Person.Gender.valueOf(input.get("gender")));
        rec.setHall(Person.Hall.valueOf(input.get("hall")));
        rec.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        rec.setFloor(input.get("floor"));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Basic Attributes Set", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/create-account")
    public ResponseEntity<String> createREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setName(input.get("name"));
        rec.setEmail(input.get("email"));
        rec.setId(input.get("inputId"));
        rec.setEnabled(Boolean.parseBoolean(input.get("enabled")));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("New REA Account Created", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/create-welcome-message")
    public ResponseEntity<String> createWelcomeMessageREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.createWelcomeMessage(input.get("message"));
        rec.saveAccountFile();
        
        return new ResponseEntity<String>("Welcome Message Created", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/get-welcome-message")
    public ResponseEntity<String> getWelcomeMessageREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        
        return new ResponseEntity<String>(rec.getWelcomeMessage(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/delete-welcome-message")
    public ResponseEntity<String> deleteWelcomeMessageREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        rec.deleteWelcomeMessage();
        rec.saveAccountFile();
        
        return new ResponseEntity<String>("Welcome Message Deleted", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/add-ra/{raId}")
    public ResponseEntity<String> addRAInREC(@PathVariable String id, @PathVariable String raId) {
        rec.loadAccountFile(id);
        
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.setReaId(id);
        ra.saveAccountFile();

        rec.addRaAccount(raId);
        rec.saveAccountFile();

        return new ResponseEntity<String>("RA Added: " + raId, HttpStatus.CREATED);
    }


    @GetMapping("/{id}/add-rea/{reaId}")
    public ResponseEntity<String> addREAInREC(@PathVariable String id, @PathVariable String reaId) {
        rec.loadAccountFile(id);
        
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.setReaId(id);
        rea.saveAccountFile();

        rec.addReaAccount(reaId);
        rec.saveAccountFile();

        return new ResponseEntity<String>("REA Added: " + reaId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/remove-ra/{raId}")
    public ResponseEntity<String> removeRAInREC(@PathVariable String id, @PathVariable String raId) {
        rec.loadAccountFile(id);

        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.setReaId(null);
        ra.saveAccountFile();

        rec.removeRaAccount(raId);
        rec.saveAccountFile();

        return new ResponseEntity<String>("RA Removed: " + raId, HttpStatus.CREATED);
    }


    @GetMapping("/{id}/remove-rea/{reaId}")
    public ResponseEntity<String> removeREAInREC(@PathVariable String id, @PathVariable String reaId) {
        rec.loadAccountFile(id);

        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.setReaId(null);
        rea.saveAccountFile();

        rec.removeReaAccount(reaId);
        rec.saveAccountFile();

        return new ResponseEntity<String>("REA Removed: " + reaId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/get-ras")
    public ResponseEntity<String> getRAsInREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String>(rec.getRAs(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-primary/{raId}")
    public ResponseEntity<String> completedRAprimaryShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Primary Shifts Completed: " + ra.primaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-secondary/{raId}")
    public ResponseEntity<String> completedRAsecondaryShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Secondary Shifts Completed: " + ra.secondaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-tertiary/{raId}")
    public ResponseEntity<String> completedRAtertiaryShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Number of Tertiary Shifts Completed: " + ra.tertiaryShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra-stats/{raId}")
    public ResponseEntity<String> completedRAShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>("Total Shifts Completed: " + ra.totalShiftsCompleted(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/ra/{raId}/get-events")
    public ResponseEntity<String> getRAEventsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/get-shifts")
    public ResponseEntity<String> getRAShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-event/{eventId}")
    public ResponseEntity<String> deleteRAEventREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteEvent(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-day")
    public ResponseEntity<String> deleteEventDayRAFromREC(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventDay(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Day", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-week")
    public ResponseEntity<String> deleteEventWeekRAFromREC(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventWeek(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Week", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/delete-event-month")
    public ResponseEntity<String> deleteEventMonthRAFromREC(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.getSchedule().deleteEventMonth(Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Deleted Month", HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-title")
    public ResponseEntity<String> editRAEventTitleREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("title"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Title: " + input.get("title"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-description")
    public ResponseEntity<String> editRAEventDescriptionREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("description"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Description: " + input.get("description"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/edit-event/{eventId}/edit-duty-level")
    public ResponseEntity<String> editRAEventDutyLevelREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().editEventTitle(eventId, input.get("dutyLevel"));
        ra.saveAccountFile();
        return new ResponseEntity<String>("Edited Duty Level: " + input.get("dutyLevel"), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/add-event/{eventId}")
    public ResponseEntity<String> addRAEventREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
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
    public ResponseEntity<String> addRAShiftREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
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
    public ResponseEntity<String> viewRAShiftDropsREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.saveAccountFile();
        return new ResponseEntity<String>(ra.getShiftDropRequests(), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/deny-drop/{eventId}")
    public ResponseEntity<String> denyRADropREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(id);
        ra.deleteShiftDropRequest(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>("Drop Denied for Event: " + eventId, HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-shift/{eventId}")
    public ResponseEntity<String> deleteRAShiftREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteShift(eventId);
        ra.saveAccountFile();
        return new ResponseEntity<String>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-shift/{eventId}")
    public ResponseEntity<String> createShiftREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endzone")));

                                          
        rec.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        rec.saveAccountFile();
        return new ResponseEntity<String>(rec.getSchedule().getEvents(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-event/{eventId}")
    public ResponseEntity<String> createEventREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);

        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endTimezone")));
        rec.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, (input.get("dutyLevel").equals("null")) ? null :Shift.DutyLevel.valueOf(input.get("dutyLevel"))));
        rec.saveAccountFile();
        return new ResponseEntity<String>(rec.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/delete-event/{eventId}")
    public ResponseEntity<String> deleteEventREC(@PathVariable String id, @PathVariable String eventId) {
        rec.loadAccountFile(id);

        rec.getSchedule().deleteEvent(eventId);
        rec.saveAccountFile();
        return new ResponseEntity<String>("Deleted: " + eventId, HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-day")
    public ResponseEntity<String> deleteEventDayREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.getSchedule().deleteEventDay(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("timezone")));
        rec.saveAccountFile();
        return new ResponseEntity<String>("Deleted Day", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-week")
    public ResponseEntity<String> deleteEventWeekREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.getSchedule().deleteEventWeek(Integer.parseInt(input.get("day")), Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        rec.saveAccountFile();
        return new ResponseEntity<String>("Deleted Week", HttpStatus.OK);
    }

    @PostMapping("/{id}/delete-event-month")
    public ResponseEntity<String> deleteEventMonthREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.getSchedule().deleteEventMonth(Integer.parseInt(input.get("month")), Integer.parseInt(input.get("year")), Integer.parseInt(input.get("timezone")));
        rec.saveAccountFile();
        return new ResponseEntity<String>("Deleted Month", HttpStatus.OK);
    }

    @PostMapping("/{id}/find-user-in-hall")
    public ResponseEntity<String> findIdsInHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        
        StringBuilder buffer = new StringBuilder();
        buffer.append("{ \"raIds\" : ");
        buffer.append(rec.findInHall("RA", input.get("hall")));
        buffer.append("\n\"reaIds\" : ");
        buffer.append(rec.findInHall("REA", input.get("hall")));
        buffer.append("\n\"recIds\" : ");
        buffer.append(rec.findInHall("REC", input.get("hall")));
        buffer.append(" }");
        
        return new ResponseEntity<String>(buffer.toString(), HttpStatus.OK);
    }

}
