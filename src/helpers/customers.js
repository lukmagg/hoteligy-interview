import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const token = import.meta.env.VITE_API_TOKEN

export const getCustomers = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const customers = response.data

    return customers
  } catch (error) {
    console.error('Error geting customers: ', error)
    throw error
  }
}

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error deleting customer: ', error)
    throw error
  }
}

export const createCustomer = async (newCustomer) => {
  try {
    const response = await axios.post(apiUrl, newCustomer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (error) {
    console.error('Error creating customer: ', error)
    throw error
  }
}

export const updateCustomer = async (id, customer) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error updating customer: ', error)
    throw error
  }
}
