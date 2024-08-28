import { useState, useEffect } from 'react'
import { createJob, getAccelerator } from '../../services/api'
import expand from '../../assets/job/expand.svg'
import del from '../../assets/job/delete.svg'
import info from '../../assets/job/info.svg'
import required from '../../assets/job/required.svg'
import RangeSlider from '../shared/Range/RangeSlider'
import { sliderConfigs } from '../shared/Range/sliderConfigs'
import { countryOptions } from '../shared/Location/locationOptions'
import Tooltip from '../shared/tooltip'

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobType: 'requirements',
    image: '',
    command: '',
    instance_type_id: '',
    cores: '',
    memory: '',
    accelerators: '',
    accelerator_type: '',
    location: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [acceleratorTypes, setAcceleratorTypes] = useState([])
  const [, setCoresDisplay] = useState('')
  const [, setMemoryDisplay] = useState('')
  const [, setAcceleratorsDisplay] = useState('')
  // const [envVars, setEnvVars] = useState([{ key: '', value: '' }])
  const [envVars, setEnvVars] = useState([])
  const [isSustainable, setIsSustainable] = useState(false)
  // handle error
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchAcceleratorTypes = async () => {
      try {
        const response = await getAccelerator()
        setAcceleratorTypes(response.accelerator_types)
      } catch (error) {
        console.error('Error fetching accelerator types:', error)
        if (error) {
          setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      }
    }

    fetchAcceleratorTypes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSliderChange = (type, displayValue) => {
    setFormData((prevState) => {
      if (prevState[type] !== displayValue) {
        return {
          ...prevState,
          [type]: displayValue,
        }
      }
      return prevState
    })

    switch (type) {
      case 'cores':
        setCoresDisplay(displayValue)
        break
      case 'memory':
        setMemoryDisplay(displayValue)
        break
      case 'accelerators':
        setAcceleratorsDisplay(displayValue)
        break
      default:
        break
    }
  }

  const handleCheckboxChange = (e) => {
    setIsSustainable(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Form data before submission:', {
        ...formData,
        envVars,
        sustainable: isSustainable,
      })

      const [imageName, imageTag] = formData.image.split(':')

      let requestData = {
        requirements: {
          cpu: {
            cores: parseInt(formData.cores) || undefined,
          },
          ram: {
            size: parseInt(formData.memory) || undefined,
          },
          accelerator: {
            no: parseInt(formData.accelerators) || undefined,
            name: formData.accelerator_type || undefined,
          },
          region: {
            location: formData.location || undefined,
            sustainable: isSustainable,
          },
        },
        docker_run_parameters: {
          image_name: imageName || formData.image,
          image_tag: imageTag || null,
          command: formData.command || undefined,
          env_variables: envVars.reduce((acc, envVar) => {
            if (envVar.key && envVar.value) {
              acc[envVar.key] = envVar.value
            }
            return acc
          }, {}),
        },
      }

      if (imageTag) {
        requestData.docker_run_parameters.image_tag = imageTag
      } else {
        requestData.docker_run_parameters.image_tag = null
      }

      const cleanObject = (obj) => {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === 'object') cleanObject(obj[key])
          else if (obj[key] === undefined || obj[key] === '') delete obj[key]
        })
        return obj
      }

      requestData = cleanObject(requestData)

      console.log('Request data:', JSON.stringify(requestData, null, 2))

      await createJob(requestData)
      setIsSubmitted(true)

      //refresh the page after new job submit
      // setTimeout(() => {
      //   window.location.reload()
      // }, 5000)
    } catch (error) {
      console.error('Error creating job:', error)
      if (error) {
        setErrorMessage(`Error ${error.status_code}: ${error.detail}`)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    }
  }

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }])
  }

  const handleEnvVarChange = (index, e) => {
    const { name, value } = e.target
    const newEnvVars = [...envVars]
    newEnvVars[index][name] = value
    setEnvVars(newEnvVars)
  }

  const removeEnvVar = (index) => {
    setEnvVars(envVars.filter((_, i) => i !== index))
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-semibold mb-8'>Requirements</h1>

        {isSubmitted ? (
          <div className='bg-emerald-200 text-emerald-700 p-4 rounded font-semibold w-fit'>
            Job created successfully
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            {errorMessage && (
              <div className='bg-[#ef233c] text-[#26045d] p-4 rounded mb-4 font-semibold w-fit'>
                {errorMessage}
              </div>
            )}
            <div className='grid grid-cols-2 gap-10'>
              <RangeSlider
                config={sliderConfigs.cpuCores}
                onChange={(value, displayValue) =>
                  handleSliderChange('cores', displayValue)
                }
              />
              <RangeSlider
                config={sliderConfigs.memory}
                onChange={(value, displayValue) =>
                  handleSliderChange('memory', displayValue)
                }
              />
              <RangeSlider
                config={sliderConfigs.accelerator}
                onChange={(value, displayValue) =>
                  handleSliderChange('accelerators', displayValue)
                }
              />

              <div className='grid grid-cols-2 gap-8 pl-6'>
                <div className='grid grid-rows-2'>
                  <div>
                    <label className='block my-4'>Accelerator Type</label>
                    <div className='relative'>
                      <select
                        id='accelerator_type'
                        name='accelerator_type'
                        value={formData.accelerator_type}
                        onChange={handleChange}
                        className='custom-select w-full text-sm create-job border py-1 px-2 pr-8 rounded-md appearance-none focus:ring-0 cursor-pointer'
                      >
                        <option value=''>Any</option>
                        {acceleratorTypes.map((type) => (
                          <option key={type.id} value={type.name} className=''>
                            {type.display_name}
                          </option>
                        ))}
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
                        <img src={expand} alt='Expand' />
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <label htmlFor='sustainability' className='mr-5'>
                      Sustainability
                    </label>
                    <input
                      type='checkbox'
                      id='sustainability'
                      name='sustainability'
                      checked={isSustainable}
                      onChange={handleCheckboxChange}
                      // className='accent-[#26045d] cursor-pointer h-5 w-5'
                      className='create-job w-4 h-4 cursor-pointer appearance-none outline-none text-[#26045d] rounded focus:ring-0 dark:bg-[#26045d] border checked:border-[#7747ff]'
                    />
                  </div>
                </div>
                <div>
                  <label className='block my-4 '>Location</label>
                  <div className='relative'>
                    <select
                      id='location'
                      name='location'
                      value={formData.location}
                      onChange={handleChange}
                      className='w-full text-sm create-job border py-1 px-2 pr-8 rounded-md appearance-none focus:ring-0 cursor-pointer'
                    >
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
                      <img src={expand} alt='Expand' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className='text-2xl font-semibold mb-4 mt-8'>
              Workload information
            </h2>

            <div className='grid'>
              <div className='relative mb-4'>
                <input
                  type='text'
                  id='image'
                  name='image'
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className='w-full border bg-transparent px-3 py-1 required placeholder-transparent relative'
                  placeholder=' '
                />
                <label
                  htmlFor='image'
                  className='label-input absolute text-sm bg-[#151a2d] px-1 top-[-10px] left-3 transform'
                >
                  Image Name
                </label>
                <img
                  src={required}
                  alt='Required'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10'
                />
              </div>

              <div className='relative mb-4'>
                <div className='flex items-center'>
                  <input
                    type='text'
                    id='command'
                    name='command'
                    value={formData.command}
                    onChange={handleChange}
                    className='w-full border bg-transparent px-3 py-1 placeholder-transparent'
                    placeholder=' '
                  />
                  <Tooltip>
                    <img
                      src={info}
                      alt='info'
                      className='ml-2 w-7 h-7 flex-shrink-0 cursor-pointer'
                    />
                  </Tooltip>
                </div>
                <label
                  htmlFor='command'
                  className='label-input absolute text-sm bg-[#151a2d] px-1 top-[-10px] left-3 transform'
                >
                  Command
                </label>
              </div>
            </div>

            <h2 className='text-xl mt-20'>
              Environment variables
              <p className='mt-2 text-sm'>
                Environment variables defined below will be injected in your
                job.
              </p>
            </h2>
            <div>
              {envVars.map((envVar, index) => (
                <div key={index} className='flex items-center space-x-4 mb-4'>
                  <div className='relative flex-grow'>
                    <input
                      type='text'
                      name='key'
                      value={envVar.key}
                      onChange={(e) => handleEnvVarChange(index, e)}
                      required
                      className='w-full border bg-transparent px-3 py-1 required'
                    />
                    <label
                      htmlFor='key'
                      className='label-input absolute text-sm bg-[#151a2d] px-1 top-[-10px] left-3 transform'
                    >
                      Key
                    </label>
                    <img
                      src={required}
                      alt='Required'
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10'
                    />
                  </div>

                  <div className='relative flex-grow'>
                    <input
                      type='text'
                      name='value'
                      value={envVar.value}
                      onChange={(e) => handleEnvVarChange(index, e)}
                      required
                      className='w-full border bg-transparent px-3 py-1 required'
                    />
                    <label
                      htmlFor='value'
                      className='label-input absolute text-sm bg-[#151a2d] px-1 top-[-10px] left-3 transform'
                    >
                      Value
                    </label>
                    <img
                      src={required}
                      alt='Required'
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10'
                    />
                  </div>

                  <button
                    type='button'
                    onClick={() => removeEnvVar(index)}
                    className='delete p-1 rounded-md bg-transparent border'
                  >
                    <img src={del} alt='Delete' className='w-5 h-5' />
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={addEnvVar}
                className='create-job w-fit h-fit font-semibold px-2 py-1 rounded border mt-4'
              >
                + Add variable
              </button>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='create-job font-semibold px-2 py-1 rounded border mb-20 mt-5'
              >
                Start Job
              </button>
            </div>
          </form>
        )}
      </div>
      <div className='col-span-1'></div>
    </div>
  )
}

export default JobForm
