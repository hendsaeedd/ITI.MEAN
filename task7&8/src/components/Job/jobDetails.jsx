import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getJobs, cancelJob, getInstance } from '../../services/api'
import logs from '../../assets/job/logs.svg'
import sortdown from '../../assets/job/sortdown.svg'
import sortup from '../../assets/job/sortup.svg'
import getStatusColor from '../shared/StatusColors/jobStatusColors'

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState({})
  const [instanceData, setInstanceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)
  const [isLogsVisible, setIsLogsVisible] = useState(true)
  //handle error
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchJobAndInstanceDetails = async () => {
      try {
        const jobResponse = await getJobs()
        if (jobResponse.status === 'Success') {
          const jobData = jobResponse.jobs.find((job) => job.id === id)
          if (jobData) {
            setJob(jobData)
            // Fetch instance data
            if (
              jobData.runtime_metadata &&
              jobData.runtime_metadata.instance_type_id
            ) {
              const instanceResponse = await getInstance(
                jobData.runtime_metadata.instance_type_id
              )
              if (
                instanceResponse.status === 'Success' &&
                instanceResponse.instance_types.length > 0
              ) {
                setInstanceData(instanceResponse.instance_types[0])
              }
            }
          } else {
            setError('Job not found.')
          }
        } else {
          setError('Failed to fetch job details. Please try again later.')
        }
      } catch (error) {
        if (error) {
          setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJobAndInstanceDetails()
  }, [id])

  const handleCancelJob = async () => {
    try {
      await cancelJob(job.id)
      setIsCancelled(true)
      //refresh the page after cancel
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      if (error) {
        setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    }
  }
  const toggleLogsVisibility = () => {
    setIsLogsVisible(!isLogsVisible)
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

  //duration
  const formatDuration = (start, end) => {
    const startTime = new Date(start)
    const endTime = new Date(end)
    const duration = Math.floor((endTime - startTime) / 1000)
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}m ${seconds}s`
  }

  const formatPrice = (priceObject) => {
    if (typeof priceObject === 'object' && priceObject !== null) {
      const currency =
        priceObject.currency === 'EUR' ? '€' : priceObject.currency
      const price = parseFloat(priceObject.unit_price).toFixed(2)
      return `${currency}${price}`
    }
    return 'N/A'
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8'>Job overview</h1>
      {errorMessage && (
        <div className='bg-[#ef233c] text-[#26045d] p-4 rounded mb-4 font-semibold w-fit grid'>
          {errorMessage}
        </div>
      )}
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : error ? (
        <p className='bg-[#ef233c] text-[#26045d] p-4 rounded mb-4 font-semibold w-fit grid'>
          {error}
        </p>
      ) : isCancelled ? (
        <p className='bg-emerald-200 text-emerald-700 p-4 rounded font-semibold w-fit'>
          Job cancelled successfully!
        </p>
      ) : (
        <div>
          <div className='grid grid-cols-3 gap-4 items-center mb-8 '>
            <span className='text-lg'>{job.id}</span>
            <span
              className={`px-3 font-semibold py-1 w-fit rounded text-center text-[#26045d] uppercase ${getStatusColor(
                job.status
              )}`}
            >
              {job.status}
            </span>
            <div>
              <button
                className='create-job font-semibold px-2 py-1 rounded border bg-[#26045d]'
                onClick={handleCancelJob}
                disabled={
                  !(job.status === 'INITIALIZING' || job.status === 'RUNNING')
                }
              >
                {job.status === 'INITIALIZING' || job.status === 'RUNNING'
                  ? 'Cancel'
                  : 'Relaunch'}
              </button>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 mb-10'>
            <div>
              <p className='text-sm mb-3'>Create Time</p>
              <h2 className='text-lg uppercase'>
                {formatDate(job.created_at)}
              </h2>
            </div>
            <div>
              <p className='text-sm mb-3 '>Start Time</p>
              <h2 className='text-lg uppercase'>
                {formatDate(job.started_at)}
              </h2>
            </div>
            <div>
              <p className='text-sm mb-3 '>Duration</p>
              <h2 className='text-lg'>
                {formatDuration(job.started_at, job.done_at)}
              </h2>
            </div>
            <div>
              <p className='text-sm mb-3 '>Price</p>
              <h2 className='text-lg'>{formatPrice(job.price)}</h2>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <h2 className='text-xl mb-4'>About Instance</h2>
            <h2 className='text-xl mb-4'>About Workload</h2>
          </div>
          {instanceData && (
            <div className='grid grid-cols-4 gap-4 text-sm mb-20'>
              <div>
                <p>ID: {instanceData.id}</p>
                <p>Name: {instanceData.name}</p>
                <p>Provider: {instanceData.provider.name}</p>
                <p>Region: {instanceData.region.name}</p>
                <p>Availability Zone: {instanceData.zone.name}</p>
              </div>

              <div>
                <p>CPU: {instanceData.cpu.cores}</p>
                <p>
                  RAM: {`${instanceData.ram.size} ${instanceData.ram.unit}`}
                </p>
                <p>
                  Accelerator:{' '}
                  {instanceData.accelerator?.accelerator_types?.[0]
                    ?.display_name || ''}
                </p>

                <p>No of Accelerators: {instanceData.accelerator.no}</p>
              </div>
              <div>
                <p>
                  Image Name:{' '}
                  {job.docker_metadata.docker_run_parameters.image_name}
                </p>
                <p>
                  Tag: {job.docker_metadata.docker_run_parameters.image_tag}
                </p>
                <div>
                  <p>Environment Variables:</p>
                  {job.docker_metadata &&
                  job.docker_metadata.docker_run_parameters &&
                  job.docker_metadata.docker_run_parameters.env_variables ? (
                    <div>
                      {Object.entries(
                        job.docker_metadata.docker_run_parameters.env_variables
                      ).map(([key, value]) => (
                        <div key={key}>
                          <span className='font-mono text-[#8c98ff]'>
                            {key}
                          </span>
                          <span className='mx-2'>:</span>
                          <span className='font-mono text-gray-400'>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          <div className='mb-20'>
            <div className='flex items-center '>
              <img src={logs} alt='Logs Icon' className='h-6 w-6' />
              <h1 className='text-lg font-semibold'>Logs</h1>
              <img
                src={isLogsVisible ? sortup : sortdown}
                alt={isLogsVisible ? 'Sort Up Icon' : 'Sort Down Icon'}
                className='h-4 w-4 cursor-pointer'
                onClick={toggleLogsVisibility}
              />
            </div>
            {isLogsVisible && (
              <p className='text-sm'>
                ===== Application Startup at {job.logs} =====
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetails
