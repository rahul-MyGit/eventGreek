import CategoriesList from './categories-list'

export interface Category {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CategoryListProps{
    categoryList: Category[]
}
function Categories({categoryList} :CategoryListProps) {
  return (
    <>
    <div className='p-10'>
    <div className='text-2xl pb-3'>
        <h1>Categories</h1>
    </div>
    <div className='flex space-x-4'>
        {
            categoryList.map((item: Category) => (
                <CategoriesList key={item.id} name={item.name} url={item.url} id={item.id} />
            ))
        }
    </div>
    </div>
    </>
  )
}

export default Categories;
