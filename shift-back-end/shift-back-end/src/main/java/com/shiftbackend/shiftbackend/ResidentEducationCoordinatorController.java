package com.shiftbackend.shiftbackend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shiftbackend.shiftbackend.Shift.DutyLevel;

import java.util.Map;

@RestController
@RequestMapping("/rec")
@CrossOrigin(origins = "*")
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

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable-rea/{reaId}")
    public ResponseEntity<String> enableREAFromREC(@PathVariable String id, @PathVariable String reaId) {
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.enableAccount();
        rea.saveAccountFile();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/enable-ra/{raId}")
    public ResponseEntity<String> enableRAFromREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.enableAccount();
        ra.saveAccountFile();

        return new ResponseEntity<String>("Account Enabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable")
    public ResponseEntity<String> disableREC(@PathVariable String id) {
        rec.loadAccountFile(id);
        rec.disableAccount();
        rec.saveAccountFile();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable-rea/{reaId}")
    public ResponseEntity<String> disableREAFromREA(@PathVariable String id, @PathVariable String reaId) {
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.disableAccount();
        rea.saveAccountFile();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/disable-ra/{raId}")
    public ResponseEntity<String> disableRAFromREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.disableAccount();
        ra.saveAccountFile();

        return new ResponseEntity<String>("Account Disabled", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-floor")
    public ResponseEntity<String> setFloorREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setFloor(input.get("floor"));
        rec.saveAccountFile();

        return new ResponseEntity<String>("Floor Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-timezone")
    public ResponseEntity<String> setTimezoneREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setTimezone(Integer.parseInt(input.get("timezone")));
        rec.saveAccountFile();
        rec.addUser();

        return new ResponseEntity<String>("Timezone Edited", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/set-all")
    public ResponseEntity<String> setInputREC(@PathVariable String id, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        rec.setName(input.get("name"));
        rec.setEmail(input.get("email"));
        rec.setId(id);
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
        rec.setId(id);
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
    public ResponseEntity<String[]> getRAsInREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String[]>(rec.getRAs(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/get-reas")
    public ResponseEntity<String[]> getREAsInREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String[]>(rec.getREAs(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/assign-shifts")
    public ResponseEntity<String> assignShiftsREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        rec.assignShifts();

        rec.saveAccountFile();

        return new ResponseEntity<String>("Shifts Assigned", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/assign-shifts-randomly")
    public ResponseEntity<String> assignShiftsRandomlyREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        rec.randomlyAssignShifts();

        rec.saveAccountFile();

        return new ResponseEntity<String>("Shifts Assigned", HttpStatus.CREATED);
    }

    @GetMapping("/{id}/assign-shifts-automatically")
    public ResponseEntity<String> assignShiftsAutomaticallyREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        rec.automaticallyAssignShifts();

        rec.saveAccountFile();

        return new ResponseEntity<String>("Shifts Assigned", HttpStatus.CREATED);
    }

    @PostMapping("/{id}/shift-complete/{raId}")
    public ResponseEntity<String> raShiftCompleteREC(@PathVariable String id, @PathVariable String raId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.addCompletedShift((input.get("dutyLevel").equals("null")) ? null : Shift.DutyLevel.valueOf(input.get("dutyLevel")));
        ra.saveAccountFile();

        return new ResponseEntity<String>("Added Complete Shift to " + raId, HttpStatus.CREATED);
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
    public ResponseEntity<String[]> getRAEventsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String[]>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/get-shifts")
    public ResponseEntity<String[]> getRAShiftsREC(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/get-meetings")
    public ResponseEntity<String[]> getRAMeetingsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        return new ResponseEntity<String[]>(ra.getSchedule().getMeetings(), HttpStatus.OK);
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
    public ResponseEntity<String[]> addRAEventREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
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
        return new ResponseEntity<String[]>(ra.getSchedule().getEvents(), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/add-shift/{eventId}")
    public ResponseEntity<String[]> addRAShiftREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        String title = rec.getSchedule().getEvent(eventId).getTitle();
        String description = rec.getSchedule().getEvent(eventId).getDescription();
        TimeBlock startTime = rec.getSchedule().getEvent(eventId).getStart();
        TimeBlock endTime = rec.getSchedule().getEvent(eventId).getEnd();
        DutyLevel dutyLevel = rec.getSchedule().getEvent(eventId).getDutyLevel();

        rec.getSchedule().getEvent(eventId).decAvailability();

        ra.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, dutyLevel));
        ra.saveAccountFile();
        rec.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/view-drop-requests")
    public ResponseEntity<String[]> viewRAShiftDropsREA(@PathVariable String id, @PathVariable String raId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);
        ra.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getShiftDropRequests(), HttpStatus.OK);
    }

    @PostMapping("/{id}/ra/{raId}/deny-drop/{eventId}")
    public ResponseEntity<String> denyRADropREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(id);
        ra.deleteShiftDropRequest(eventId);
        ra.saveAccountFile();

        rec.getSchedule().getEvent(eventId).decAvailability();

        rec.saveAccountFile();
        return new ResponseEntity<String>("Drop Denied for Event: " + eventId, HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-shift/{eventId}")
    public ResponseEntity<String[]> deleteRAShiftREC(@PathVariable String id, @PathVariable String raId, @PathVariable String eventId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteShift(eventId);
        ra.saveAccountFile();

        rec.getSchedule().getEvent(eventId).incAvailability();

        rec.saveAccountFile();

        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-shift/{eventId}")
    public ResponseEntity<String[]> createShiftREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        String title = input.get("title");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endTimezone")));

        String description = "Weekday";
        if (startTime.dayOfWeek().equals("Sunday") || startTime.dayOfWeek().equals("Saturday")) {
            description = "Weekend";
        }
                                          
        rec.getSchedule().addEvent(new Shift (eventId, title, description, startTime, endTime, Shift.DutyLevel.valueOf(input.get("dutyLevel")), Integer.parseInt(input.get("availability"))));
        rec.saveAccountFile();
        return new ResponseEntity<String[]>(rec.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-events")
    public ResponseEntity<String[]> getEventsREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String[]>(rec.getSchedule().getEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-shifts")
    public ResponseEntity<String[]> getShiftsREC(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String[]>(rec.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-meetings")
    public ResponseEntity<String[]> getMeetingsREA(@PathVariable String id) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String[]>(rec.getSchedule().getMeetings(), HttpStatus.OK);
    }

    @GetMapping("/{id}/get-availability/{eventId}")
    public ResponseEntity<String> getAvailabilityREC(@PathVariable String id, @PathVariable String eventId) {
        rec.loadAccountFile(id);

        return new ResponseEntity<String>("" + rec.getSchedule().getEvent(eventId).getAvailability(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-event/{eventId}")
    public ResponseEntity<String[]> createEventREC(@PathVariable String id, @PathVariable String eventId, @RequestBody Map<String, String> input) {
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
        return new ResponseEntity<String[]>(rec.getSchedule().getEvents(), HttpStatus.OK);
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

    @PostMapping("/{id}/ra/{raId}/add-meeting/{meetingId}")
    public ResponseEntity<String[]> addRAMeetingREA(@PathVariable String id, @PathVariable String raId, @PathVariable String meetingId) {
        rec.loadAccountFile(id);
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        String title = rec.getSchedule().getEvent(meetingId).getTitle();
        String description = rec.getSchedule().getEvent(meetingId).getDescription();
        TimeBlock startTime = rec.getSchedule().getEvent(meetingId).getStart();
        TimeBlock endTime = rec.getSchedule().getEvent(meetingId).getEnd();
        DutyLevel dutyLevel = rec.getSchedule().getEvent(meetingId).getDutyLevel();

        rec.getSchedule().getEvent(meetingId).decAvailability();

        ra.getSchedule().addEvent(new Shift (meetingId, title, description, startTime, endTime, dutyLevel));
        ra.saveAccountFile();
        rec.saveAccountFile();
        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/ra/{raId}/delete-meeting/{meetingId}")
    public ResponseEntity<String[]> deleteRAMeetingREA(@PathVariable String id, @PathVariable String raId, @PathVariable String meetingId) {
        ResidentAssistant ra = new ResidentAssistant();
        ra.loadAccountFile(raId);

        ra.getSchedule().deleteShift(meetingId);
        ra.deleteShiftDropRequest(meetingId);
        ra.saveAccountFile();

        rec.getSchedule().getEvent(meetingId).incAvailability();

        rec.saveAccountFile();

        return new ResponseEntity<String[]>(ra.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/create-meeting/{meetingId}")
    public ResponseEntity<String[]> createMeetingREA(@PathVariable String id, @PathVariable String meetingId, @RequestBody Map<String, String> input) {
        rec.loadAccountFile(id);
        String title = input.get("title");
        String description = input.get("description");
        TimeBlock startTime = new TimeBlock(Integer.parseInt(input.get("startHour")), Integer.parseInt(input.get("startMinute")),
                                            Integer.parseInt(input.get("startMonth")), Integer.parseInt(input.get("startDay")),
                                            Integer.parseInt(input.get("startYear")), Integer.parseInt(input.get("startTimezone")));
        TimeBlock endTime = new TimeBlock(Integer.parseInt(input.get("endHour")), Integer.parseInt(input.get("endMinute")),
                                          Integer.parseInt(input.get("endMonth")), Integer.parseInt(input.get("endDay")),
                                          Integer.parseInt(input.get("endYear")), Integer.parseInt(input.get("endTimezone")));
                                          
        rec.getSchedule().addEvent(new Shift (meetingId, title, description, startTime, endTime, Shift.DutyLevel.valueOf("MEETING"), Integer.parseInt(input.get("availability"))));
        rec.saveAccountFile();
        return new ResponseEntity<String[]>(rec.getSchedule().getShifts(), HttpStatus.OK);
    }

    @PostMapping("/{id}/find-ra-in-hall")
    public ResponseEntity<String[]> findRAsInHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        
        
        String[] array = rec.findInHall("RA", input.get("hall"));

        for (int i = 0; i < array.length; i++) {
            array[i] = "{\"raId\": \"" + array[i] + "\"}";
        }
        
        return new ResponseEntity<String[]>(array, HttpStatus.OK);
    }

    @PostMapping("/{id}/find-rea-in-hall")
    public ResponseEntity<String[]> findREAsInHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        
        
        String[] array = rec.findInHall("REA", input.get("hall"));

        for (int i = 0; i < array.length; i++) {
            array[i] = "{\"reaId\": \"" + array[i] + "\"}";
        }
        
        return new ResponseEntity<String[]>(array, HttpStatus.OK);
    }

    @PostMapping("/{id}/find-rec-in-hall")
    public ResponseEntity<String[]> findRECsInHallRA(@PathVariable String id, @RequestBody Map<String, String> input) {
        
        
        String[] array = rec.findInHall("REC", input.get("hall"));

        for (int i = 0; i < array.length; i++) {
            array[i] = "{\"recId\": \"" + array[i] + "\"}";
        }
        
        return new ResponseEntity<String[]>(array, HttpStatus.OK);
    }

    @GetMapping("/{id}/report-ra/{raId}")
    public ResponseEntity<String> reportRAInREC(@PathVariable String id, @PathVariable String raId) {

        ResidentEducationAssistant ra = new ResidentEducationAssistant();
        ra.loadAccountFile(raId);
        ra.reportUser();
        ra.saveAccountFile();
        
        return new ResponseEntity<String>("RA Id: " + raId + " Reported", HttpStatus.OK);
    }

    @GetMapping("/{id}/false-report-ra/{raId}")
    public ResponseEntity<String> falseReportRAInREC(@PathVariable String id, @PathVariable String raId) {
        
        ResidentEducationAssistant ra = new ResidentEducationAssistant();
        ra.loadAccountFile(raId);
        ra.falseReport();
        ra.saveAccountFile();
        
        return new ResponseEntity<String>(raId + " Report Nullified", HttpStatus.OK);
    }

    @GetMapping("/{id}/clear-reports-ra/{raId}")
    public ResponseEntity<String> clearReportsRAInREC(@PathVariable String id, @PathVariable String raId) {
        
        ResidentEducationAssistant ra = new ResidentEducationAssistant();
        ra.loadAccountFile(raId);
        ra.resetReports();
        ra.saveAccountFile();
        
        return new ResponseEntity<String>(raId + " Reports Reset", HttpStatus.OK);
    }

    @GetMapping("/{id}/report-rea/{reaId}")
    public ResponseEntity<String> reportREAInREC(@PathVariable String id, @PathVariable String reaId) {
        
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.reportUser();
        rea.saveAccountFile();
        
        return new ResponseEntity<String>("REA Id: " + reaId + " Reported", HttpStatus.OK);
    }

    @GetMapping("/{id}/false-report-rea/{reaId}")
    public ResponseEntity<String> falseReportREAInREC(@PathVariable String id, @PathVariable String reaId) {
        
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.falseReport();
        rea.saveAccountFile();
        
        return new ResponseEntity<String>(reaId + " Report Nullified", HttpStatus.OK);
    }

    @GetMapping("/{id}/clear-reports-rea/{reaId}")
    public ResponseEntity<String> clearReportsREAInREC(@PathVariable String id, @PathVariable String reaId) {
        
        ResidentEducationAssistant rea = new ResidentEducationAssistant();
        rea.loadAccountFile(reaId);
        rea.resetReports();
        rea.saveAccountFile();
        
        return new ResponseEntity<String>(reaId + " Reports Reset", HttpStatus.OK);
    }

    @GetMapping("/{id}/report-rec/{recId}")
    public ResponseEntity<String> reportRECInREC(@PathVariable String id, @PathVariable String recId) {
        
        rec.loadAccountFile(recId);
        rec.reportUser();
        rec.saveAccountFile();
        
        return new ResponseEntity<String>("REC Id: " + recId + " Reported", HttpStatus.OK);
    }

    @GetMapping("/{id}/false-report-rec/{recId}")
    public ResponseEntity<String> falseReportRECInREC(@PathVariable String id, @PathVariable String recId) {
        
        rec.loadAccountFile(recId);
        rec.falseReport();
        rec.saveAccountFile();
        
        return new ResponseEntity<String>(recId + " Report Nullified", HttpStatus.OK);
    }

    @GetMapping("/{id}/clear-reports-rec/{recId}")
    public ResponseEntity<String> clearReportsRECInREC(@PathVariable String id, @PathVariable String recId) {
        
        rec.loadAccountFile(recId);
        rec.resetReports();
        rec.saveAccountFile();
        
        return new ResponseEntity<String>(recId + " Reports Reset", HttpStatus.OK);
    }
}
