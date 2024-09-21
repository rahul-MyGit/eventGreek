'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { updateUserToAdminAction } from "../actions/userActions";

function CreatedEvents() {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("SESSION", session);
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
        No event exists
      </div>
    </>
  );
}

export default CreatedEvents;