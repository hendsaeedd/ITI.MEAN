import { Link } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { path: '/jobs', label: 'Jobs' },
    { path: '/create-job', label: 'Create Job' },
    { path: '/instance', label: 'Instance' },
    { path: '/accelerator', label: 'Accelerator Type' },
    { path: '/create-accelerator', label: 'Create Accelerator Type' },
    { path: '/generateBill', label: 'Generate Bill' },
  ]
  const rightLinks = [
    { path: '/', label: 'Docs' },
    { path: '/', label: 'Slack' },
    { path: '/', label: 'Omar' },
  ]

  return (
    <nav className='nav mb-8 flex flex-wrap justify-between items-center sticky sm:z-20 top-0 bg-[#151a2d]'>
      <div className='mt-4'>
        <Link
          to='/create-job'
          className='bg-[#7747FF] font-semibold px-2 w-fit py-0.5 rounded mt-8 text-sm'
        >
          New job
        </Link>
      </div>
      <div className='flex flex-wrap space-x-2 text-xs sm:text-sm'>
        {navLinks.map((link, index) => (
          <Link to={link.path} key={index} className='p-1'>
            {link.label}
          </Link>
        ))}
      </div>
      <div className='flex flex-wrap space-x-2 font-semibold text-xs sm:text-sm underline'>
        {rightLinks.map((link, index) =>
          link.path ? (
            <Link to={link.path} key={index} className='p-1'>
              {link.label}
            </Link>
          ) : (
            <span key={index} className='p-1'>
              {link.label}
            </span>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar
