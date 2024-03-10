import axios from 'axios'
import {
  GuardianApiResponse,
  NewsApiResponse,
  ResponseSource,
} from '../models/models.model'
const VITE_NEWS_API_API_KEY = 'd6b0495557c84be8a81d54eed826b648'
const VITE_GUARDIAN_API_KEY = '2baeabf6-e517-4631-b27f-be3cda882dd6'

// export const getNewsFromNewsApi = async (): Promise<NewsApiResponse> => {
//   const url = `https://newsapi.org/v2/top-headlines?country=us`
//   try {
//     const response = await axios.get(url, {
//       headers: { 'X-Api-Key': VITE_NEWS_API_API_KEY },
//     })
//     const data: NewsApiResponse = response.data
//     console.log('getNewsFromNewsApi', data)
//     return data
//   } catch (error) {
//     console.error('Error fetching news:', error)
//     throw error
//   }
// }
export const SearchNews = async (
  searchQuery = 'gaza',
  country?: any,
  sources?: any
): Promise<NewsApiResponse> => {
  const url = `https://newsapi.org/v2/top-headlines?q=${searchQuery}`
  try {
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': VITE_NEWS_API_API_KEY },
    })
    const data: NewsApiResponse = response.data
    console.log('getNewsFromNewsApi', data)
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}
export const getNewsApiSources = async (): Promise<ResponseSource> => {
  const url = `https://newsapi.org/v2/top-headlines/sources`
  try {
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': VITE_NEWS_API_API_KEY },
    })
    const data: ResponseSource = response.data
    console.log('sources', data)
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}
// export const getGuardianNews = async (
//   searchQuery: string = 'gaza'
// ): Promise<GuardianApiResponse> => {
//   const url = `https://content.guardianapis.com/search?q=${searchQuery}&api-key=${VITE_GUARDIAN_API_KEY}`
//   try {
//     const response = await axios.get(url)
//     const data: GuardianApiResponse = response.data
//     console.log('getGuardianNews', data)
//     return data
//   } catch (error) {
//     console.error('Error fetching news:', error)
//     throw error
//   }
// }
