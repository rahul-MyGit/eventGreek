
interface eventViewProp {
    eventId: string;
    categoryId: string;
}
//@ts-ignore
const EventsDetails = ({params} : eventViewProp) => {
    const {eventId} = params
    
  return (
    <div>
      GOING TO FETCH THE DETAILS OF EVENT USING SERVER ACTIONS[EVENTID] : {eventId}
    </div>
  )
}

export default EventsDetails;
