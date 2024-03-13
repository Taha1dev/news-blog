import { useEffect, useState } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from '@material-tailwind/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NavList from './NavList'

export function NavBar() {
  const [openNav, setOpenNav] = useState(false)

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false)

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <Navbar placeholder={''} className="w-full px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="lead"
          placeholder={''}
          className="mr-4 cursor-pointer !font-bold text-lg py-1.5"
        >
          News Blog
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          placeholder={''}
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  )
}
