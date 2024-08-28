import { useState, useEffect } from 'react'

const RangeSlider = ({ config, onChange }) => {
  const [value, setValue] = useState(0)
  const { label, ticks, unit } = config

  const getDisplayValue = (tickValue) => {
    if (tickValue === 'Any') {
      return unit ? unit : ''
    }
    return `${tickValue}${unit ? ` ${unit}` : ''}`
  }

  const displayValue = getDisplayValue(ticks[value])

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    setValue(newValue)
    if (onChange) {
      onChange(ticks[newValue], getDisplayValue(ticks[newValue]))
    }
  }

  useEffect(() => {
    if (onChange) {
      onChange(ticks[value], displayValue)
    }
  }, [value, displayValue, onChange, ticks])

  return (
    <div>
      <div className='p-4'>
        <label className='block mb-5 text-lg'>
          {label}: {displayValue}
        </label>
        <div className='relative pl-2'>
          <div className='relative w-full h-0.5 bg-[#AFACAE]'>
            <div
              className='absolute h-full bg-[#7747FF]'
              style={{
                width: `${(value / (ticks.length - 1)) * 100}%`,
              }}
            />
            {ticks.map((_, index) => (
              <div
                key={index}
                className={`range absolute w-0.5 h-4 ${
                  index <= value ? 'bg-[#7747FF]' : 'bg-[#AFACAE]'
                }`}
                style={{
                  left: `${(index / (ticks.length - 1)) * 100}%`, //small lines
                  bottom: '-7.5px',
                }}
              />
            ))}
          </div>
          <input
            type='range'
            required //required??
            min={0}
            max={ticks.length - 1}
            value={value}
            step={1}
            onChange={handleChange}
            className='range-slider absolute top-0 w-full appearance-none bg-transparent'
            style={{
              '--thumb-size': '16px',
              '--thumb-color': '#CFFF05',
              '--thumb-cursor': 'pointer',
              top: '-8.9px',
              left: '4.5px',
            }}
          />
          <div className='flex justify-between text-xs mt-4 relative'>
            {ticks.map((tick, index) => (
              <span
                key={index}
                className={`absolute -translate-x-1/2 ${
                  index <= value ? 'text-[#ffffff]' : 'text-[#AAA7AA]'
                }`}
                style={{ left: `${(index / (ticks.length - 1)) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RangeSlider
