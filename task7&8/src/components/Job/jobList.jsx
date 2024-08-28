import { useState, useEffect } from 'react'
import { getJobs, cancelJob } from '../../services/api'
import { Link } from 'react-router-dom'
import Table from '../shared/table'
import sortIcon from '../../assets/job/forward.svg'
import sortIconDesc from '../../assets/job/forward2.svg'
import getStatusColor from '../shared/StatusColors/jobStatusColors'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [, setIsCancelled] = useState(false)
  //handle error
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const data = await getJobs()
      setJobs(data.jobs || [])
    } catch (error) {
      // console.error('Failed to fetch jobs:', error)
      if (error) {
        setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }

    const sortedJobs = [...jobs].sort((a, b) => {
      if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1
      if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    setJobs(sortedJobs)
  }

  const formatPrice = (priceObject) => {
    if (typeof priceObject === 'object' && priceObject !== null) {
      let currency
      switch (priceObject.currency) {
        case 'EUR':
          currency = '€'
          break
        case 'USD':
          currency = '$'
          break
        default:
          currency = priceObject.currency
      }
      const price = parseFloat(priceObject.unit_price).toFixed(2)
      return `${currency} ${price}`
    }
    return 'N/A'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC',
      timeZoneName: 'short',
    }).format(date)
  }

  const handleCancelJob = async (jobId) => {
    try {
      await cancelJob(jobId)
      setErrorMessage(null)
      setIsCancelled(true)
      fetchJobs() //refresh jobs after cancel
    } catch (error) {
      console.error('Error cancelling job:', error)
      if (error) {
        setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    }
  }

  const columns = [
    {
      field: 'id',
      label: 'ID',
      sortIconAsc: sortIcon,
      sortIconDesc: sortIconDesc,
    },
    {
      field: 'status',
      label: 'Status',
      sortIconAsc: sortIcon,
      sortIconDesc: sortIconDesc,
    },
    {
      field: 'start',
      label: 'Start',
      sortIconAsc: sortIcon,
      sortIconDesc: sortIconDesc,
    },
    {
      field: 'price',
      label: 'Price',
      sortIconAsc: sortIcon,
      sortIconDesc: sortIconDesc,
    },
  ]

  const renderRow = (job) => (
    <tr key={job.id} className='border-b text-sm hover:bg-[#26045d]'>
      <td className='py-2 px-4'>
        <Link to={`/job/${job.id}`}>{job.id}</Link>
      </td>
      <td className='py-2 px-4'>
        <span
          className={`px-1 rounded uppercase ${getStatusColor(job.status)}`}
        >
          {job.status}
        </span>
      </td>
      <td className='py-2 px-4 uppercase'>{formatDate(job.started_at)}</td>
      <td className='py-2 px-4'>{formatPrice(job.price)}</td>
      <td className='py-2 px-4'>
        <button
          className='px-1 rounded bg-[#26045d] '
          onClick={() => handleCancelJob(job.id)}
          disabled={
            !(job.status === 'INITIALIZING' || job.status === 'RUNNING')
          }
        >
          {job.status === 'INITIALIZING' || job.status === 'RUNNING'
            ? 'Cancel'
            : 'Relaunch'}
        </button>
      </td>
    </tr>
  )

  if (loading) return <p className='text-center '>Loading...</p>

  return (
    <div className='mb-20'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-semibold'>All Jobs</h1>

        {errorMessage && (
          <div className='bg-[#ef233c] text-[#26045d] p-4 rounded mb-4 font-semibold w-fit grid'>
            {errorMessage}
          </div>
        )}
        <Link
          to='/create-job'
          className='create-job sm:mr-20 font-semibold px-2 py-1 rounded border'
        >
          Create new job
        </Link>
      </div>
      {jobs.length === 0 ? (
        <p className='text-center'>No jobs found.</p>
      ) : (
        <Table
          columns={columns}
          data={jobs}
          renderRow={renderRow}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}
    </div>
  )
}

export default JobList
