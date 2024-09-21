import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'

const CategoriesList = ({url, name, id} : {
    url: string,
    name: string,
    id: number
  
}) => {
  return (
    <div>
        <Link href={`/category/${id}`}>
      <Card className="max-w-sm h-auto">
        <CardHeader>
          <Image
            className="rounded-lg"
            src={url}
            alt="img"
            width={400}
            height={300}
            priority
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-2xl font-bold">
            {name}
          </CardTitle>
        </CardContent>
      </Card>
      </Link>
    </div>
  )
}

export default CategoriesList;