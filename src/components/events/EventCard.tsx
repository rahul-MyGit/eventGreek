import React from 'react'
import { Event } from './EventList';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';

interface EventCardProp {
    event : Event
}
function EventCard({event} : EventCardProp) {
    return (
        <Link href={`/category/${event.categoryId}/${event.id}`}>
      <Card>
        <CardContent className="bg-white rounded-md overflow-hidden shadow-md p-5 hover:scale-[1.05] transition-all">
          <h2 className="text-2xl text-gray-700 font-bold">{event.name}</h2>
          {event.images && event.images.length > 0 && (
            <div className="mb-3">
              <h3 className="font-bold">Images:</h3>
              <div className="flex space-x-3">
                {event.images.map((image, index) => (
                  <img key={index} src={image} alt="Event" className="w-16 h-16 rounded-lg" />
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-2">{event.description}</p>
          <p className="text-gray-700">Location: {event.location}</p>
          <p className="text-gray-700">Date: {new Date(event.date).toLocaleDateString()}</p>

          {event.guests && event.guests.length > 0 && (
            <div className="mt-3 dark:text-gray-700">
              <h3 className="font-bold">Guests:</h3>
              <ul className="list-disc list-inside">
                {event.guests.map((guest, index) => (
                  <li key={index}>{guest}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
      );
}

export default EventCard
