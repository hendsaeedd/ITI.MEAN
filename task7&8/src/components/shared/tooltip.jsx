import { useState } from 'react'

const Tooltip = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <div
      className='relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className='absolute bg-[#26045d] px-4 py-2 mt-5 rounded w-60 text-xs sm:left-0 right-0'>
          Specify the command to run inside the container. This could be an
          executable, script, or any valid shell command. If left empty, the
          default command defined in the Docker image will be used.
        </div>
      )}
    </div>
  )
}

export default Tooltip
