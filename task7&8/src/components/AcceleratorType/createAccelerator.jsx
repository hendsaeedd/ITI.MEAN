import { useState } from 'react'
import { createAccelerator } from '../../services/api'

const CreateAccelerator = () => {
  const [acceleratorTypeQuery, setAcceleratorTypeQuery] = useState({
    no: 0,
    memory: { size: '' },
    vendor: '',
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    const keys = name.split('.')
    setAcceleratorTypeQuery((prev) => {
      const updatedQuery = { ...prev }
      if (keys.length === 2) {
        updatedQuery[keys[0]] = { ...prev[keys[0]], [keys[1]]: value }
      } else {
        updatedQuery[name] = value
      }
      return updatedQuery
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await createAccelerator({
        accelerator_type_query: acceleratorTypeQuery,
      })
      setStatus(response.message)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Create Accelerator</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg shadow-md p-4'
      >
        {[
          {
            label: 'No',
            id: 'no',
            type: 'number',
            value: acceleratorTypeQuery.no,
          },
          {
            label: 'Memory Size (GB)',
            id: 'memory.size',
            type: 'text',
            value: acceleratorTypeQuery.memory.size,
          },
          {
            label: 'Vendor',
            id: 'vendor',
            type: 'text',
            value: acceleratorTypeQuery.vendor,
          },
        ].map((field) => (
          <div className='mb-4' key={field.id}>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor={field.id}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={field.value}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              required
            />
          </div>
        ))}
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Accelerator'}
          </button>
        </div>
        {status && <p className='text-green-500 mt-4'>{status}</p>}
        {error && <p className='text-red-500 mt-4'>{error}</p>}
      </form>
    </div>
  )
}

export default CreateAccelerator
