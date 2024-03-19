import { Button, Input, Option, Select } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { ContextProps, DataContext } from '../../context/ContextProvider'
import { GetNews, SearchNews } from '../../utils/axios'

const Filter = () => {
  const [selectedCat, setSelectedCat] = useState('general')
  const [selectedLang, setSelectedLang] = useState('en')
  const [selectedCountry, setSelectedCountry] = useState('en')
  const {
    setNewsData,
    searchValue,
    setSearchValue,
    langs,
    setIsLoading,
    categories,
    sources,
  } = useContext(DataContext) as ContextProps
  useEffect(() => {
    console.log(langs)
    console.log(sources)
    console.log(categories)
  }, [])

  const handleSearch = async () => {
    console.log(searchValue)
    setIsLoading(true)
    setNewsData(await SearchNews(searchValue))
    setIsLoading(false)
  }

  const handleLangsChange = async (lang: string) => {
    setIsLoading(true)
    console.log(lang)
    setSelectedLang(lang)
    setNewsData(await GetNews(selectedCat, lang, selectedCountry))
    setIsLoading(false)
  }
  const handleCountryChange = async (Country: any) => {
    setIsLoading(true)
    setSelectedCountry(Country)
    setNewsData(await GetNews(selectedCat, selectedLang, Country))
    setIsLoading(false)
  }

  const handleCategoriesChange = async (selectedCategory: any) => {
    setIsLoading(true)
    console.log(selectedCategory)
    setSelectedCat(selectedCategory)
    setNewsData(await GetNews(selectedCategory, selectedLang, selectedCountry))
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto">
      <div className="mt-4 flex lg:flex-row gap-4 flex-col m-2">
        <Select
          placeholder={''}
          label="Select Language"
          onChange={(value) => handleLangsChange(value as string)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {langs
            ? Array.from(langs).map((lang, i) => (
                <Option value={lang} key={i}>
                  {lang as React.ReactNode}
                </Option>
              ))
            : ''}
        </Select>
        <Select
          placeholder={' '}
          label="Select Category"
          onChange={(value) => handleCategoriesChange(value)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {categories
            ? Array.from(categories).map((cat, i) => (
                <Option value={cat as string} key={i}>
                  {cat as React.ReactNode}
                </Option>
              ))
            : ''}
        </Select>
        <Select
          placeholder={''}
          label="Select country"
          onChange={(value) => handleCountryChange(value as string)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {sources
            ? Array.from(sources).map((s, i) => (
                <Option value={s as string} key={i}>
                  {s as React.ReactNode}
                </Option>
              ))
            : ''}
        </Select>
      </div>
      <div className="relative flex flex-1">
        <Input
          crossOrigin={''}
          type="text"
          label="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          color="black"
          placeholder={''}
          size="sm"
          onClick={handleSearch}
          className="!absolute right-1 top-1 rounded"
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default Filter
