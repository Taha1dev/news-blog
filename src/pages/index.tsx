import React, { useEffect, useState } from 'react'
import { GuardianApiResponse, NewsApiResponse } from '../models/models.model'
import { getNewsApiSources, SearchNews } from '../utils/axios'
import CategoriesBar from '../components/chunks/CategoriesBar'
import Spinner from '../components/chunks/Spinner'
import { Input, Select, Option } from '@material-tailwind/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
const Article = React.lazy(() => import('../components/News/Article'))
function Home() {
  const [newsData, setNewsData] = useState<NewsApiResponse>(
    {} as NewsApiResponse
  )
  const [categories, setCategories] = useState<any>()
  const [sources, setSources] = useState<any>()
  const [langs, setLangs] = useState<any>([])
  const [guardianNews, setGuardianNews] = useState<GuardianApiResponse>(
    {} as GuardianApiResponse
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dataFromNewsApi = await SearchNews()
        setNewsData(dataFromNewsApi)
        // const dataFromGuardian: GuardianApiResponse =
        //   await getGuardianNews('gaza')
        // setGuardianNews(dataFromGuardian)
        const res = await getNewsApiSources()
        const uniqueCategories = [
          ...new Set(res.sources.map((source) => source.category)),
        ]
        const uniqueSources = [
          ...new Set(res.sources.map((source) => source.country)),
        ]
        const uniqueLangs = [
          ...new Set(res.sources.map((source) => source.language)),
        ]
        setCategories(uniqueCategories)
        setSources(uniqueSources)
        setLangs(uniqueLangs)
        console.log('categories', categories)
        console.log('langs', langs)
        console.log('sources', sources)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className=" flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }
  return (
    <>
      <div className="container mx-auto my-8 flex flex-col items-center">
        <CategoriesBar categories={categories} />
        <div className="mt-4 flex lg:flex-row gap-4 flex-col m-2">
          <Input
            variant="outlined"
            crossOrigin={''}
            className="flex-1"
            label="Search..."
            icon={<MagnifyingGlassIcon />}
          />
          <Select
            placeholder={'Languages'}
            label="Select Version"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {langs &&
              Array.from(langs).map((lang, i) => (
                <Option key={i}>{lang as React.ReactNode}</Option>
              ))}
          </Select>
          <Select
            placeholder={'Countries'}
            label="Select Country"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {langs &&
              Array.from(categories).map((cat, i) => (
                <Option key={i}>{cat as React.ReactNode}</Option>
              ))}
          </Select>
          <Select
            placeholder={'Languages'}
            label="Select Version"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            {langs &&
              Array.from(sources).map((s, i) => (
                <Option key={i}>{s as React.ReactNode}</Option>
              ))}
          </Select>
        </div>
        <h1 className="mt-2 text-3xl font-bold  mb-4">Latest News</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {newsData.articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
