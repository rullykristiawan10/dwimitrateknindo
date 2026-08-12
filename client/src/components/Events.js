import React from 'react';
import { TbCalendarEvent, TbBuilding } from 'react-icons/tb';
import { events } from '../data';

function Events() {
  return (
    <section className="events-section">
      <div className="events-bg-top"></div>
      <div className="events-bg-bottom"></div>
      <div className="container events-container">
        <div className="events-header-wrapper">
          <div className="events-red-line"></div>
          <h2 className="events-title">Events</h2>
        </div>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="event-logo">
                  <img src={event.logo} alt={event.title} />
                </div>
                <div className="event-flag" title="Country Flag">
                  {event.flag}
                </div>
              </div>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <div className="event-detail-item">
                  <TbCalendarEvent className="event-icon" />
                  <span>{event.date}</span>
                </div>
                <div className="event-detail-item">
                  <TbBuilding className="event-icon" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="event-type">{event.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
