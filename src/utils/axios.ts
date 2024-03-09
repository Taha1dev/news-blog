import axios from 'axios';
import { GuardianApiResponse, NewsApiResponse, ResponseSource } from '../models/models.model';
const VITE_NEWS_API_API_KEY = '24c1c5f8f6e94fdeaf99eeef0b49891b'
const VITE_GUARDIAN_API_KEY = '2baeabf6-e517-4631-b27f-be3cda882dd6'

// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
// const day = currentDate.getDate().toString().padStart(2, '0');
// const formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate)

export const getNewsFromNewsApi = async (searchQuery = 'covid'): Promise<NewsApiResponse> => {
  const url = `https://newsapi.org/v2/top-headlines?country=us`;
  try {
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': VITE_NEWS_API_API_KEY }
    });
    const data: NewsApiResponse = response.data
    console.log("getNewsFromNewsApi", data)
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
export const getNewsApiSources = async (): Promise<ResponseSource> => {
  const url = `https://newsapi.org/v2/top-headlines/sources`;
  try {
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': VITE_NEWS_API_API_KEY }
    });
    const data: ResponseSource = response.data
    console.log("getNewsFromNewsApi", data)
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getGuardianNews = async (searchQuery: string = 'gaza'): Promise<GuardianApiResponse> => {
  const url = `https://content.guardianapis.com/search?q=${searchQuery}&api-key=${VITE_GUARDIAN_API_KEY}`;
  try {
    const response = await axios.get(url);
    const data: GuardianApiResponse = response.data
    console.log("getGuardianNews", data)
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};



