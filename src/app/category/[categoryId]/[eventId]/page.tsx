
interface eventViewProp {
    eventId: string;
    categoryId: string;
}
//@ts-ignore
const EventsDetails = ({params} : eventViewProp) => {
    const {eventId} = params
    console.log(params);
    
    //TODO: Fetch details of that event and [Booking ticket should below the details of event]    
  return (

    <div>
      GOING TO FETCH THE DETAILS OF EVENT USING SERVER ACTIONS[EVENTID] : {eventId}
    </div>
  )
}

export default EventsDetails;
