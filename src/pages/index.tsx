import { lazy, useEffect, useState } from 'react'
import { GuardianApiResponse, NewsApiResponse } from '../models/models.model'
import {
  getGuardianNews,
  getNewsApiSources,
  getNewsFromNewsApi,
} from '../utils/axios'
import { Spinner } from '@material-tailwind/react'
import CategoriesBar from '../components/chunks/CategoriesBar'

const Article = lazy(() => import('../components/News/Article'))
function Home() {
  const [newsData, setNewsData] = useState<NewsApiResponse>(
    {} as NewsApiResponse
  )
  const [categories, setCategories] = useState<any>()
  const [sources, setSources] = useState<any>()
  const [langs, setLangs] = useState<any>({})
  const [guardianNews, setGuardianNews] = useState<GuardianApiResponse>(
    {} as GuardianApiResponse
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dataFromNewsApi = await getNewsFromNewsApi()
        setNewsData(dataFromNewsApi)
        const dataFromGuardian = await getGuardianNews('gaza')
        setGuardianNews(dataFromGuardian)
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
        console.log('unique', categories)
        console.log('unique', langs)
        console.log('unique', sources)
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
        <h1 className="mt-2 text-3xl font-bold text-white mb-4">Latest News</h1>
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
