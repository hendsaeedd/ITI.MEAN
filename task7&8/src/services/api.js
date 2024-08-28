import axios from 'axios'
import { handleApiError } from '../utils/errorHandler/errorHandler'
// const API_URL = import.meta.env.API_URL

//todo: use dotenv

// const API_URL = '/api'
const API_URL = 'http://34.159.179.144'
const headers = {
  Authorization:
    'Bearer 5eVqA773973RMgYGes5xNhhpFakHTtTeeHb2kGzY7epcn7YLxfqrSbRxai3pW4w4',
  'X-PERIAN-AUTH-ORG': 'perian',
}

//getjob api function
export async function getJobs(page = 1, limit = 25) {
  const url = `${API_URL}/job`
  try {
    const response = await axios.get(url, { params: { limit, page }, headers })
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//create job api function
export async function createJob(jobData) {
  const url = `${API_URL}/job`
  try {
    const response = await axios.post(url, jobData, { headers })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//cancel job function
export async function cancelJob(jobId) {
  const url = `${API_URL}/job/${jobId}/cancel`
  try {
    const response = await axios.patch(url, null, { headers })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//get accelerator-type api function
export async function getAccelerator() {
  const url = `${API_URL}/accelerator-type`
  try {
    const response = await axios.get(url, { headers })
    // console.time()
    console.log(response)
    // console.timeEnd()
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//create accelerator-type api function
export async function createAccelerator(acceleratorTypeQuery) {
  const url = `${API_URL}/accelerator-type`
  try {
    const response = await axios.post(url, acceleratorTypeQuery, { headers })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//generate bill api function
export async function generateBill(organization) {
  const url = `${API_URL}/billing/generate`
  try {
    const response = await axios.get(url, { params: { organization }, headers })
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

//instance api function
export async function getInstance(instance_type_id) {
  const url = `${API_URL}/instance-type/${instance_type_id}`
  try {
    const response = await axios.get(url, { headers })
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}
