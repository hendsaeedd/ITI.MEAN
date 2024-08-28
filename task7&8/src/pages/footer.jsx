import logo from '../assets/job/logo.svg'
import sun from '../assets/job/sun.svg'
import moon from '../assets/job/moon.svg'

const Footer = () => {
  return (
    //fixed bottom-0 left-0 w-full
    <footer className='footer text-white p-2 flex flex-col sm:grid sm:grid-cols-3 gap-4 font-semibold items-center'>
      <div className='flex items-center justify-center sm:justify-start space-x-2 text-sm order-2 sm:order-1 mt-4 sm:mt-0'>
        <span>&copy; PERIAN 2024</span>
      </div>
      <div className='flex items-center justify-center space-x-2 order-1 sm:order-2'>
        <img src={logo} className='h-10 w-10' alt='Perian logo' />
        <span className='sm:inline'>Pioneer the Sky</span>
      </div>
      <div className='flex justify-center sm:justify-end order-3 '>
        <div className='theme rounded border'>
          <button className=' p-2 ' aria-label='Light mode'>
            <img src={sun} className='h-6 w-6' alt='Sun icon' />
          </button>
          <button className=' p-2 bg-black rounded' aria-label='Dark mode'>
            <img src={moon} className='h-6 w-6' alt='Moon icon' />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
