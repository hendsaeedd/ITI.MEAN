import { getInstance } from '../../services/api'
import { useState } from 'react'
import RangeSlider from '../shared/Range/RangeSlider'
import { sliderConfigs } from '../shared/Range/sliderConfigs'

function Instance() {
  const [instanceTypeId, setInstanceTypeId] = useState('')
  const [instanceData, setInstanceData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInstanceData(null)
    try {
      const data = await getInstance(instanceTypeId)
      setInstanceData(data.instance_types[0])
    } catch (err) {
      console.error('Failed to fetch instance data:', err)
    }
  }

  return (
    
    <div className='p-4 max-w-md mx-auto rounded-xl space-y-4 text-white'>
      <RangeSlider 
        config={sliderConfigs.cpuCores} 
        onChange={(value) => console.log('Selected CPU Cores:', value)} 
      />
      <RangeSlider 
        config={sliderConfigs.memory} 
        onChange={(value) => console.log('Selected Memory:', value)} 
      />
      <div className="range-container">
  <div className="range-track">
    <div className="range-fill"></div>
  </div>
  <input type="range" min="0" max="9" value="2" className="range-input"/>
  <div className="range-labels">
    <span>Any</span>
    <span>1</span>
    <span>2</span>
    <span>4</span>
    <span>8</span>
    <span>16</span>
    <span>32</span>
    <span>64</span>
    <span>128</span>
    <span>128+</span>
  </div>
</div>
      <h2 className='text-xl font-bold text-center'>Get Instance Data</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={instanceTypeId}
          onChange={(e) => setInstanceTypeId(e.target.value)}
          placeholder='Enter Instance Type ID'
          required
          className='w-full px-3 py-2 border rounded-md bg-transparent'
        />
        <button
          type='submit'
          className='w-full'
        >
          Get Instance Data
        </button>
      </form>
      {instanceData && (
        <div className='mt-4 p-4 bg-gray-800 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>About Instance</h3>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div>
              <p><span className=''>ID:</span> {instanceData.id}</p>
              <p><span className=''>Name:</span> {instanceData.name}</p>
              <p><span className=''>Provider:</span> {instanceData.provider.name}</p>
              <p><span className=''>Region:</span> {instanceData.region.name}</p>
              <p><span className=''>Availability Zone:</span> {instanceData.zone.name}</p>
            </div>
            <div>
              <p><span className=''>CPU Cores:</span> {instanceData.cpu.cores}</p>
              <p><span className=''>RAM:</span> {instanceData.ram.size} {instanceData.ram.unit}</p>
              <p><span className=''>Accelerator:</span> {instanceData.accelerator?.name || 'N/A'}</p>
              <p><span className=''>No. of Accelerators:</span> {instanceData.accelerator?.count || '0'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Instance