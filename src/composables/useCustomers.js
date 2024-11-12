import { getCustomers } from '@/helpers/getCustomers'
import { useCustomersStore } from '@/stores/customersStore'

export const useCustomers = async () => {
  // get customers
  const customers = await getCustomers()

  // get store
  const customersStore = useCustomersStore()

  customersStore.customers = customers
}
