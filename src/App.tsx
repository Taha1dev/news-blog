import { useEffect, useState } from 'react';
import { getGuardianNews, getNewsFromNewsApi } from './utils/axios';
import { GuardianApiResponse, NewsApiResponse } from './models/models.model';

function App() {
  const [newsData, setNewsData] = useState<NewsApiResponse>(
    [] as NewsApiResponse
  );
  const [guardianNews, setGuardianNews] = useState<GuardianApiResponse>(
    {} as GuardianApiResponse
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataFromNewsApi = await getNewsFromNewsApi();
        setNewsData(dataFromNewsApi);
        const dataFromGuardian = await getGuardianNews('gaza');
        setGuardianNews(dataFromGuardian);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('News from NewsAPI:', newsData);
  }, [newsData]);

  useEffect(() => {
    console.log('Guardian News:', guardianNews);
  }, [guardianNews]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto my-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {newsData.articles.map((article, index) => (
          <div
            key={index}
            className="bg-white border p-4 rounded-md shadow-md flex flex-col max-w-sm"
          >
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <img
              src={article.urlToImage}
              alt={article.title}
              height={200}
              width={200}
              loading="lazy"
              className="my-4 w-full max-h-48 object-cover rounded-md"
            />
            <p className="text-sm text-gray-500">
              Source: {article.source.name}
            </p>
            <p className="text-sm text-gray-500">
              Published at: {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
