'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserEventsAction, updateUserToAdminAction } from "../actions/userActions";


interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  guests: string[];
  images: string[];
  categoryId: number;
  organizerId: number;
  createdAt: Date;
  updatedAt: Date;
}

function CreatedEvents() {
  const { data: session, update } = useSession();
  const [events, setEvents] = useState<Event[] | undefined>([]);

  const router = useRouter();

  useEffect(() => {
    //TODO: display all events created by user
    const fetchEvents = async () => {
      try {
        const eventsData = await getUserEventsAction();
        if(eventsData.success){
          setEvents(eventsData.events);
        }else{
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        console.log(error);
        alert("Failed to fetch events")
      }
    }

    fetchEvents();
  }, [session]);

  const handleCreateEvent = async () => {
    if (session?.user && session.user.isAdmin === true) {
      router.push("/page2");
    } else {
      try {
        console.log("inside try");
        
        const result = await updateUserToAdminAction();
        console.log(result);
        

        if (result.success) {

          await update({ ...session?.user, isAdmin: true });
          router.push("/page2");
        } else {
          throw new Error("Failed to update admin status or create event");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create event. Please try again.");
      }
    }
  };

  return (
    <>
      <button
        className="bg-white text-black m-2"
        onClick={handleCreateEvent}
      >
        Create Event
      </button>
      <div>
      {events && events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="flex justify-between">
              <div>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              </div>
              <div>
                EDIT
              </div>
            </div>
          ))
        ) : (
          <p>No events created yet</p>
        )}
      </div>
    </>
  );
}

export default CreatedEvents;