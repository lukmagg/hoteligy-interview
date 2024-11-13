import { getCustomers, deleteCustomer } from '@/helpers/getCustomers'
import { useCustomersStore } from '@/stores/customersStore'

export function useCrud() {
  // get store
  const customersStore = useCustomersStore()

  const get = async () => {
    const customers = await getCustomers()
    customersStore.setCustomers(customers)
  }

  const remove = async (id) => {
    // remove customer
    await deleteCustomer(id)
  }

  return { get, remove }
}
