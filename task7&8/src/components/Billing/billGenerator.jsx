import { generateBill } from '../../services/api'
import { useState } from 'react'

function BillGenerator() {
  const [organization, setOrganization] = useState('')
  const [bill, setBill] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setBill(null)

    try {
      const data = await generateBill(organization)
      setBill(data)
    } catch (err) {
      setError(err.message || 'An error occurred while generating the bill.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 max-w-md mx-auto bg-white rounded-xl space-y-4'>
      <h2 className='text-xl font-bold text-center'>Bill Generator</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder='Enter organization name'
          required
          className='w-full px-3 py-2 border rounded-md focus:outline-none focus:rin '
        />
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400'
        >
          {loading ? 'Generating...' : 'Generate Bill'}
        </button>
      </form>

      {loading && <p className='text-center text-gray-500'>Loading...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}
      {bill && (
        <div className='mt-4 p-4 border-t border-gray-200'>
          <h3 className='text-lg font-semibold'>Bill Details</h3>
          <p>Organization ID: {bill.organization_id}</p>
          <p>Start Time: {bill.start_time}</p>
          <p>End Time: {bill.end_time}</p>
          <p>
            Total Price: {bill.total_price} {bill.currency}
          </p>
          <h4 className='font-semibold'>Items:</h4>
          <ul className='list-disc list-inside'>
            {bill.items.map((item, index) => (
              <li key={index}>
                Job ID: {item.job_id}, Price: {item.price} {item.currency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BillGenerator
