import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from '@/helpers/customers'
import { useCustomersStore } from '@/stores/customersStore'

export function useCustomersCrud() {
  // get store
  const customersStore = useCustomersStore()

  const get = async () => {
    const customers = await getCustomers()
    customersStore.setCustomers(customers)
  }

  const remove = async (id) => {
    // remove customer
    await deleteCustomer(id)
    customersStore.deleteCustomer(id)
  }

  const create = async (newCustomer) => {
    await createCustomer(newCustomer)
  }

  const update = async (id, customer) => {
    await updateCustomer(id, customer)
  }

  return { get, remove, create, update }
}
