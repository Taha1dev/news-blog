export type GuardianApiResponse = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}[];
export type NewsApiResponse = {
  articles: {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
};

export type ResponseSource = {
  sources: {
    id: string,
    name: string,
    description: string
    url: string,
    category: string,
    language: string,
    country: string
  }[]
}
export type Source = {
  id: string;
  name: string;
};
