const getStatusColor = (status) => {
  switch (status.toUpperCase()) {
    case 'INITIALIZING':
      return 'bg-[#cfff05] text-[#26045D]'
    case 'RUNNING':
      return 'bg-[#8c98ff] text-[#26045D]'
    case 'DONE':
      return 'bg-[#cfff05] text-[#26045D]'
    case 'SERVERERROR':
      return 'bg-[#ef233c] text-[#26045D]'
    case 'USERERROR':
      return 'bg-[#ef233c] text-[#26045D]'
    case 'CANCELLED':
      return 'bg-gray-600 text-[#26045D]'
    default:
      return 'bg-gray-500 text-[#26045D]'
  }
}

export default getStatusColor
