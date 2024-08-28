import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAccelerator } from '../../services/api'

const AcceleratorDetails = () => {
  const { id } = useParams()
  const [accelerator, setAccelerator] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAcceleratorDetails = async () => {
      try {
        const response = await getAccelerator()
        if (response.status === 'Success') {
          const foundAccelerator = response.accelerator_types.find(
            (accel) => accel.id === id
          )
          if (foundAccelerator) {
            setAccelerator(foundAccelerator)
          } else {
            setError('Accelerator not found.')
          }
        } else {
          setError(
            'Failed to fetch accelerator details. Please try again later.'
          )
        }
      } catch (error) {
        console.error('Request error:', error.message)
        setError('Failed to fetch accelerator details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAcceleratorDetails()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{accelerator.display_name}</h1>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <p className='text-gray-600'>
          <strong>Memory:</strong> {accelerator.memory.size}{' '}
          {accelerator.memory.unit}
        </p>
        <p className='text-gray-600'>
          <strong>Memory Interface:</strong> {accelerator.memory.interface}
        </p>
        <p className='text-gray-600'>
          <strong>Memory Bandwidth:</strong>
          <br /> Speed: {accelerator.memory.bandwidth.speed}
          {accelerator.memory.bandwidth.unit}
          <br /> Maximum: {accelerator.memory.bandwidth.maximum}
          {accelerator.memory.bandwidth.unit}
          <br /> Minimum: {accelerator.memory.bandwidth.minimum}
          {accelerator.memory.bandwidth.unit}
          <br /> SLA: {accelerator.memory.bandwidth.sla}
          <br /> Limit: {accelerator.memory.bandwidth.limit}
        </p>
        <p className='text-gray-600'>
          <strong>Vendor:</strong> {accelerator.vendor}
        </p>
      </div>
    </div>
  )
}

export default AcceleratorDetails
