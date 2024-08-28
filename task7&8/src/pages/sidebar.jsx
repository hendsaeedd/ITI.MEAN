import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/job/logo-txt.svg'
import home from '../assets/job/home.svg'
import setting from '../assets/job/setting.svg'
import billing from '../assets/job/billing.svg'
import support from '../assets/job/support.svg'
import faq from '../assets/job/faq.svg'
import feat from '../assets/job/feat.svg'
import arrow from '../assets/job/arrow.svg'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navigationLinks = [
    {
      to: '/',
      icon: <img src={home} alt='Jobs' className='h-7 w-7 mr-2' />,
      text: 'Jobs',
    },
    {
      category: 'Account',
      links: [
        {
          to: '/',
          icon: <img src={setting} alt='Settings' className='h-5 w-5 mr-2' />,
          text: 'Settings',
        },
        {
          to: '/',
          icon: <img src={billing} alt='Billing' className='h-5 w-5 mr-2' />,
          text: 'Billing',
        },
      ],
    },
    {
      category: 'Help',
      links: [
        {
          to: '/',
          icon: <img src={support} alt='Support' className='h-5 w-5 mr-2' />,
          text: 'Support',
        },
        {
          to: '/',
          icon: <img src={faq} alt='FAQ' className='h-5 w-5 mr-2' />,
          text: 'FAQ',
        },
        {
          to: '/',
          icon: (
            <img src={feat} alt='Feature Request' className='h-5 w-5 mr-2' />
          ),
          text: 'Feature Request',
        },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Button */}
      <button
        className='fixed top-4 left-4 z-20 md:hidden text-white'
        onClick={toggleSidebar}
      >
        <img src={arrow} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        <div className='sidebar h-screen text-white w-56 p-6 flex flex-col justify-between sticky top-0'>
          <div>
            <div className='mb-8 '>
              <Link to='/'>
                <img src={logo} alt='Logo' className='h-8 w-fit mr-2' />
              </Link>
            </div>
            <ul className='space-y-4  text-sm'>
              {navigationLinks
                .filter((link) => !link.category)
                .map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className='flex items-center rounded mb-20 font-semibold'
                    >
                      {link.icon}
                      {link.text}
                    </Link>
                  </li>
                ))}
              {navigationLinks
                .filter((link) => link.category)
                .map((category, index) => (
                  <div key={index} className='mt-6'>
                    <p className='uppercase text-sm '>{category.category}</p>
                    <ul className='mt-2 space-y-2 mb-20'>
                      {category.links.map((link, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={link.to}
                            className='flex items-center rounded font-semibold'
                          >
                            {link.icon}
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
