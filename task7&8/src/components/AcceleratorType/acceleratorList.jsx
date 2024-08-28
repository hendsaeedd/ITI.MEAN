import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAccelerator } from '../../services/api'

const AcceleratorList = () => {
  const [acceleratorTypes, setAcceleratorTypes] = useState([])

  useEffect(() => {
    const fetchAcceleratorTypes = async () => {
      try {
        const response = await getAccelerator()
        setAcceleratorTypes(response.accelerator_types)
      } catch (error) {
        console.error('Error fetching accelerator types:', error)
      }
    }

    fetchAcceleratorTypes()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Accelerator Types</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {acceleratorTypes.map((accelerator) => (
          <li
            key={accelerator.id}
            className='bg-white rounded-lg shadow-md p-4 flex flex-col'
          >
            <Link
              to={`/accelerator/${accelerator.id}`}
              className='flex-1 hover:text-blue-500'
            >
              <h2 className='text-lg font-semibold mb-2'>
                {accelerator.display_name}
              </h2>
              <p className='text-gray-600'>
                Memory: {accelerator.memory.size} {accelerator.memory.unit}
              </p>
            </Link>
            <div className='mt-4'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                {accelerator.vendor}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AcceleratorList
