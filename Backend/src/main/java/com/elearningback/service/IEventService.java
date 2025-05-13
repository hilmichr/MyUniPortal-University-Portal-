package com.esprit.elearningback.service;



import com.esprit.elearningback.entity.Event;

import java.util.List;
import java.util.Map;

public interface IEventService {
    Event addEvent(Event event);
    List<Event> getAllEvent();
    Event getEventById(long idEvent);
    void deleteEvent(long idEvent);
    Event updateEvent(Event event);
    public List<Event> getEventsByUserOrderByParticipation(Long userId);
    public Map<String, Long> countAvisByStatusForEvent(Long eventId);

}
