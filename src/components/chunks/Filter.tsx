import { Button, Input, Option, Select } from '@material-tailwind/react'
import React, { useContext } from 'react'
import { ContextProps, DataContext } from '../../context/ContextProvider'
import { SearchNews } from '../../utils/axios'

// Import statements

const Filter = () => {
  const {
    setNewsData,
    searchValue,
    setSearchValue,
    langs,
    setLangs,
    categories,
    setCategories,
    setSources,
    sources,
  } = useContext(DataContext) as ContextProps

  const handleSearch = async () => {
    console.log(searchValue)
    setNewsData(await SearchNews(searchValue))
  }

  const handleLangsChange = (selectedLang: string) => {
    console.log(selectedLang)
    // setLangs(selectedLang)
    // Additional logic if needed
  }

  const handleCategoriesChange = (selectedCategory: any) => {
    console.log(selectedCategory)
    // setCategories(selectedCategory)
    // Additional logic if needed
  }

  const handleSourcesChange = (selectedSource: string) => {
    console.log(selectedSource)
    // setSources(selectedSource)
    // Additional logic if needed
  }

  return (
    <div className="mt-4 flex lg:flex-row gap-4 flex-col m-2">
      <div className="relative flex w-full flex-1">
        <Input
          crossOrigin={''}
          type="text"
          label="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
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

      <Select
        placeholder={'Languages'}
        label="Select Version"
        onChange={(value) => handleLangsChange(value as string)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        {langs &&
          Array.from(langs).map((lang, i) => (
            <Option value={lang} key={i}>
              {lang as React.ReactNode}
            </Option>
          ))}
      </Select>

      <Select
        placeholder={'Categories'}
        label="Select Category"
        onChange={(value) => handleCategoriesChange(value)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        {categories &&
          Array.from(categories).map((cat, i) => (
            <Option value={cat as string} key={i}>
              {cat as React.ReactNode}
            </Option>
          ))}
      </Select>

      <Select
        placeholder={'Sources'}
        label="Select Source"
        onChange={(value) => handleSourcesChange(value as string)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        {sources &&
          Array.from(sources).map((s, i) => (
            <Option value={s as string} key={i}>
              {s as React.ReactNode}
            </Option>
          ))}
      </Select>
    </div>
  )
}

export default Filter
