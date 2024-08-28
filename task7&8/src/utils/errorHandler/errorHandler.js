export const handleApiError = (error) => {
  let errorDetails = {
    status: 'Error',
    message: 'An unexpected error occurred',
    detail: 'An unknown error occurred. Please try again.',
    status_code: 500,
  }

  if (error.response && error.response.data) {
    const { status, message, detail, status_code } = error.response.data
    errorDetails = {
      status: status || errorDetails.status,
      message: message || errorDetails.message,
      detail: detail || errorDetails.detail,
      status_code:
        status_code || error.response.status || errorDetails.status_code,
    }
  } else if (error.request) {
    errorDetails.detail =
      'No response received from server. Please check your connection and try again.'
  } else {
    errorDetails.detail = error.message || errorDetails.detail
  }
  console.error('API error:', errorDetails)
  return errorDetails
}
