import axios from 'axios'
import {
  getJobs,
  createJob,
  cancelJob,
  getAccelerator,
  getInstance,
  // createAccelerator,
  // generateBill,
} from '../../services/api'
// import { handleApiError } from '../../components/shared/errorHandler/errorHandler'

const API_URL = 'http://34.159.179.144'
jest.mock('axios')
jest.mock('../../utils/errorHandler/errorHandler.js', () => ({
  handleApiError: jest.fn().mockImplementation((error) => {
    throw error
  }),
}))

describe('API Functions', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('getJobs', async () => {
    const mockResponse = { data: ['job1', 'job2'] }
    axios.get.mockResolvedValue(mockResponse)

    const result = await getJobs(1, 25)
    expect(result).toEqual(mockResponse.data)
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/job`, {
      params: { limit: 25, page: 1 },
      headers: expect.any(Object),
    })
  })

  test('createJob', async () => {
    const jobData = { title: 'New Job' }
    const mockResponse = { data: { id: 1, ...jobData } }
    axios.post.mockResolvedValue(mockResponse)

    const result = await createJob(jobData)
    expect(result).toEqual(mockResponse.data)
    expect(axios.post).toHaveBeenCalledWith(`${API_URL}/job`, jobData, {
      headers: expect.any(Object),
    })
  })

  test('cancelJob', async () => {
    const jobId = 1
    const mockResponse = { data: { success: true } }
    axios.patch.mockResolvedValue(mockResponse)

    const result = await cancelJob(jobId)
    expect(result).toEqual(mockResponse.data)
    expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/job/${jobId}/cancel`, null, {
      headers: expect.any(Object),
    })
  })

  test('getAccelerator', async () => {
    const mockResponse = { data: ['acc1', 'acc2'] }
    axios.get.mockResolvedValue(mockResponse)

    const result = await getAccelerator()
    expect(result).toEqual(mockResponse.data)
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/accelerator-type`, {
      headers: expect.any(Object),
    })
  })

  test('getInstance', async () => {
    const instanceTypeId = 1
    const mockResponse = { data: { instance: 'data' } }
    axios.get.mockResolvedValue(mockResponse)

    const result = await getInstance(instanceTypeId)
    expect(result).toEqual(mockResponse.data)
    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/instance-type/${instanceTypeId}`,
      {
        headers: expect.any(Object),
      }
    )
  })
})
// test('createAccelerator', async () => {
//   const acceleratorTypeQuery = { name: 'New Accelerator' }
//   const mockResponse = { data: { id: 1, ...acceleratorTypeQuery } }
//   axios.post.mockResolvedValue(mockResponse)

//   const result = await createAccelerator(acceleratorTypeQuery)
//   expect(result).toEqual(mockResponse.data)
//   expect(axios.post).toHaveBeenCalledWith(
//     '/api/accelerator-type',
//     acceleratorTypeQuery,
//     {
//       headers: expect.any(Object),
//     }
//   )
// })

// test('generateBill', async () => {
//   const organization = 'Org1'
//   const mockResponse = { data: { bill: 'generated' } }
//   axios.get.mockResolvedValue(mockResponse)

//   const result = await generateBill(organization)
//   expect(result).toEqual(mockResponse.data)
//   expect(axios.get).toHaveBeenCalledWith('/api/billing/generate', {
//     params: { organization },
//     headers: expect.any(Object),
//   })
// })
