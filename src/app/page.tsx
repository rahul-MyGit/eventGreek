import Categories from "../components/categories/categories";
import {getCategoriesAction} from "./actions/categoryAction";

export default async function Home() {

  const cateoriesDetails = await getCategoriesAction();
  
  return (
    <div>
        <Categories categoryList={cateoriesDetails.data || []}/>

   </div>
  );
}
