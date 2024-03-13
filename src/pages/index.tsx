import React, { useEffect, useState } from 'react'
import { NewsApiResponse } from '../models/models.model'
import { getNewsApiSources, SearchNews } from '../utils/axios'
import Spinner from '../components/chunks/Spinner'
import { DataContext } from '../context/ContextProvider'
import Filter from '../components/chunks/Filter'
const Article = React.lazy(() => import('../components/News/Article'))
function Home() {
  const [newsData, setNewsData] = useState<NewsApiResponse>(
    {} as NewsApiResponse
  )

  const [categories, setCategories] = useState<any>()
  const [sources, setSources] = useState<any>()
  const [langs, setLangs] = useState<any>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dataFromNewsApi = await SearchNews()
        setNewsData(dataFromNewsApi)
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
    <DataContext.Provider
      value={{
        newsData,
        setNewsData,
        searchValue,
        setSearchValue,
        langs,
        setLangs,
        categories,
        setCategories,
        sources,
        setSources,
      }}
    >
      <div className="container mx-auto my-8 flex flex-col items-center">
        {/* <CategoriesBar categories={categories} /> */}
        <Filter />
        <h1 className="mt-2 text-3xl font-bold  mb-4">Latest News</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {newsData.articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </div>
      </div>
    </DataContext.Provider>
  )
}

export default Home
