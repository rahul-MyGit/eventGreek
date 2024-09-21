import { getAllEventAction } from "@/app/actions/categoryAction";
import EventList from "@/components/events/EventList";

interface AllEventUnderCategoryTypes {
    categoryId: string
}
async function Allevents({params} : {params : AllEventUnderCategoryTypes}) {

  const data = await getAllEventAction(params?.categoryId)
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5">Events</h1>
      <EventList events={data.data || []}  />
    </div>
  )
}

export default Allevents;
