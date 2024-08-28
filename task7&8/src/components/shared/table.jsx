import PropTypes from 'prop-types'

const Table = ({
  columns,
  data,
  renderRow,
  sortField = null,
  sortDirection = 'asc',
  onSort,
}) => {
  return (
    <div className='overflow-x-auto sm:mr-20'>
      <table className='w-full border'>
        <thead>
          <tr className='border'>
            {columns.map((column) => (
              <th
                key={column.field}
                className='py-2 px-4 text-left cursor-pointer'
                onClick={() => onSort(column.field)}
              >
                <div className='flex items-center'>
                  <span>{column.label}</span>
                  <div className='flex flex-col ml-1'>
                    <img
                      src={column.sortIconAsc}
                      alt='sort ascending'
                      className={`w-3 h-3 ${
                        sortField === column.field && sortDirection === 'asc'
                          ? ''
                          : 'opacity-50' //opacity after clicked
                      }`}
                    />
                    <img
                      src={column.sortIconDesc}
                      alt='sort descending'
                      className={`w-3 h-3 ${
                        sortField === column.field && sortDirection === 'desc'
                          ? ''
                          : 'opacity-50'
                      }`}
                    />
                  </div>
                </div>
              </th>
            ))}
            <th className='py-2 px-4 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortIconAsc: PropTypes.string.isRequired,
      sortIconDesc: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  sortField: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func.isRequired,
}

export default Table
