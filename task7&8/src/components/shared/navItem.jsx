import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import arrow from '../../assets/job/arrow.svg'

const NavItem = () => {
  const location = useLocation()
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment !== '' && segment.toLowerCase() !== 'job')

  const customizeSegment = (segment) => {
    switch (segment.toLowerCase()) {
      case 'create-job':
        return 'New Job'
      default:
        return segment.match(/^[0-9a-fA-F-]+$/)
          ? segment
          : segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }

  const hasAdditionalRoutes = pathSegments.length > 0

  return (
    <div className='bg-[#26045d] text-white flex items-center p-2 rounded mb-4 w-fit text-sm'>
      <Link
        to='/'
        className={hasAdditionalRoutes ? 'text-[#7747FF]' : 'text-white'}
      >
        Jobs
      </Link>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <span className='mx-11'>
            <img src={arrow} alt='arrow' />
          </span>
          <Link
            to={`/${['job', ...pathSegments.slice(0, index + 1)].join('/')}`}
            className={
              index === pathSegments.length - 1
                ? 'text-white'
                : 'text-[#7747FF]'
            }
          >
            {customizeSegment(segment)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default NavItem
