import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react'
import { NewsApiResponse } from '../models/models.model'

export type ContextProps = {
  newsData: NewsApiResponse
  setNewsData: any
  searchValue: string
  setSearchValue:
    | ChangeEvent<HTMLInputElement>
    | Dispatch<SetStateAction<string>>
    | any
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  langs: string
  setLangs: Dispatch<SetStateAction<string>>
  categories: string[] | any
  setCategories: Dispatch<SetStateAction<string[]>> | any
  sources: string[] | any
  setSources: Dispatch<SetStateAction<string[]>> | any
}

export const DataContext = createContext<ContextProps | undefined | null>(
  {} as ContextProps
)

// type FilterContextProviderProps = {
//   children: ReactNode;
// };

// export const FilterContextProvider = ({ children }: FilterContextProviderProps) => {
//   const [newsData, setNewsData] = useState<string>('');
//   const [searchValue, setSearchValue] = useState<string>('');
//   const [langs, setLangs] = useState<string>('');
//   const [categories, setCategories] = useState<string[]>([]);

//   const contextValues: ContextProps = {
//     newsData,
//     setNewsData,
//     searchValue,
//     setSearchValue,
//     langs,
//     setLangs,
//     categories,
//     setCategories,
//   };

//   return <DataContext.Provider value={contextValues}>{children}</DataContext.Provider>;
// };
