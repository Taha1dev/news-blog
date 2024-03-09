import { Tabs, TabsHeader, Tab } from '@material-tailwind/react'
import { Capitalaize } from '../../utils/settings'
export function CategoriesBar(props: any) {
  const handleCategoriyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.innerHTML)
  }
  return (
    <Tabs value="general">
      <TabsHeader
        className="bg-[#eee] border border-[white] flex gap-4 justify-center items-center"
        placeholder={''}
      >
        {props.categories &&
          props.categories.map((cat: any) => (
            <Tab
              onClick={(e: any) => handleCategoriyChange(e)}
              key={cat}
              value={cat}
              className="text-black"
              placeholder={''}
            >
              {Capitalaize(cat)}
            </Tab>
          ))}
      </TabsHeader>
    </Tabs>
  )
}

export default CategoriesBar
