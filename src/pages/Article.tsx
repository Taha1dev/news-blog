import { useParams } from 'react-router-dom'

const Article = () => {
  const { id, date, author } = useParams()

  return (
    <div>
      id is {id}
      <h2 className="text-white">{`Article for ${date} by ${author}`}</h2>
      {/* Your article content goes here */}
    </div>
  )
}

export default Article
