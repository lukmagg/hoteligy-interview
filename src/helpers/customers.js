import axios from 'axios'

const API_URL = 'https://frontend-interview-backend.hoteligy.dev/customers'

export const getCustomers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
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
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
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
    const response = await axios.post(API_URL, newCustomer, {
      headers: {
        Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
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
    const response = await axios.put(`${API_URL}/${id}`, customer, {
      headers: {
        Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error updating customer: ', error)
    throw error
  }
}
