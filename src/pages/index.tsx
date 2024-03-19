import React, { useEffect, useState, Suspense } from 'react'
import { NewsApiResponse } from '../models/models.model'
import { getNewsApiSources, GetNews } from '../utils/axios'
import Spinner from '../components/chunks/Spinner'
import { DataContext } from '../context/ContextProvider'
import Filter from '../components/chunks/Filter'
import ImagePlacehoderSkeleton from '../components/chunks/ImagePlacehoderSkeleton'
const Article = React.lazy(() => import('../components/News/Article'))

function Home() {
  const [newsData, setNewsData] = useState<NewsApiResponse>(
    {} as NewsApiResponse
  )

  const [categories, setCategories] = useState<any>()
  const [sources, setSources] = useState<any>()
  const [langs, setLangs] = useState<any>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const dataFromNewsApi = await GetNews()
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
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <DataContext.Provider
      value={{
        newsData,
        isLoading,
        setIsLoading,
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
        <Filter />
        <h1 className="mt-2 text-3xl font-bold  mb-4">Latest News</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <ImagePlacehoderSkeleton key={index} />
            ))
          ) : newsData.articles.length > 0 ? (
            newsData.articles.map((article, index) => (
              <Article key={index} article={article} />
            ))
          ) : (
            <h1 className="text-4xl font-bold">No Data Found! Try Search another words 💭</h1>
          )}
        </div>
      </div>
    </DataContext.Provider>
  )
}

export default Home
