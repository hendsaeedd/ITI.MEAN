export const sliderConfigs = {
  cpuCores: {
    label: 'CPU Cores',
    ticks: ['Any', '1', '2', '4', '8', '16', '32', '64', '128', '128+'],
  },
  memory: {
    label: 'Memory',
    ticks: [
      'Any',
      '2',
      '4',
      '8',
      '16',
      '32',
      '64',
      '128',
      '256',
      '512',
      '512+',
    ],
    unit: 'GB',
  },
  accelerator: {
    label: '# Accelerators',
    ticks: ['Any', '0', '1', '2', '4', '8'],
  },
}
