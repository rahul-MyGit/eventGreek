import React from 'react'
import EventCard from './EventCard';

interface Category {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date; 
}
  

export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    date: Date;
    guests: string[]; 
    images: string[]; 
    categoryId: number;
    createdAt: Date;
    updatedAt: Date; 
    category: Category; 
}

interface EventListProp {
    events: Event[];
  
}
const EventList = ({events} : EventListProp) => {
  return (
    <div className="flex flex-wrap justify-center">
    {events && events.length > 0 ? ( events.map((event : Event) => (
      <EventCard key={event.id} event={event} />
    ))) : (
        <p>No event found</p>
    )}
  </div>
  )
}

export default EventList
