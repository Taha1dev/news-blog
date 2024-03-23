import React from 'react'
import { NewsApiResponse } from '../../models/models.model'
import { Link } from 'react-router-dom'

type ArticleProps = {
  article: NewsApiResponse['articles'][0]
}
const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className="bg-card border border-[#d8d8d8] transition-colors hover:border-gray-800 p-4 rounded-md shadow-md flex flex-col max-w-sm text-gray-800">
      <a
        href={article.url || '#'}
        className="text-xl underline font-semibold mb-2"
        target="_blank"
      >
        {article.title.length > 83
          ? article.title.slice(0, 83) + '...'
          : article.title}
      </a>

      <p>{article.description}</p>
      <img
        src={article.urlToImage ?? 'assets/fallbackArticle.png'}
        alt={article.title}
        width={200}
        loading="lazy"
        className="my-4 w-full max-h-48 object-cover rounded-md"
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm ">Source: {article.source.name}</p>
          {article.author && (
            <p className="text-sm ">
              Authour:{' '}
              <span className="text-orange-700 bg-orange-100 rounded p-1">
                {article.author}
              </span>
            </p>
          )}
        </div>
        <p className="text-sm">
          Published at: &nbsp;
          <span className="text-gray-700 bg-gray-100 rounded p-1">
            {new Date(article.publishedAt).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  )
}
export default Article
