import axios from 'axios'

const API_URL = 'https://frontend-interview-backend.hoteligy.dev/customers'

// export const getTemperature = async () => {
//   const response = await axios.get(API_URL);
//   const newTemperature = response.data.current.temperature_2m;
//   return newTemperature;
// };

export const getCustomers = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
    },
  })
  const customers = response.data

  return customers
}

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer 91612a4c-a65e-49ce-a4fa-598950436b0c`,
      },
    })

    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error deleting customer: ', error)
    throw error
  }
}
