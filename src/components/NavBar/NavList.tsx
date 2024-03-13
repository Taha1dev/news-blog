import { Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getNewsApiSources } from '../../utils/axios'

function NavList() {
  const [categories, setCategories] = useState<any>(null)
  const [category, setCategory] = useState<any>(null)
  const getData = async () => {
    const res = await getNewsApiSources()
    const uniqueCategories = [
      ...new Set(res.sources.map((source) => source.category)),
    ]
    setCategories(uniqueCategories)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {categories &&
        categories.map((cat: any, index: number) => (
          <Typography
            key={index}
            placeholder={''}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Typography
              placeholder={''}
              as={'button'}
              onClick={(e: any) => {
                setCategory(e.target.innerText)
              }}
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              {cat ? cat : ''}
            </Typography>
          </Typography>
        ))}
    </ul>
  )
}

export default NavList
