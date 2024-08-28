import Navbar from './nav'
import Footer from './footer'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import NavItem from '../components/shared/navItem'

const Container = () => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <main className='main flex-1 p-4 md:p-6 container mx-auto md:px-8 lg:px-20 text-white'>
        <Navbar />
          <NavItem />
          <div className='mt-8'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Container
