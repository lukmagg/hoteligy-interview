import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([])

  function setCustomers(newCustomers) {
    customers.value = newCustomers
  }

  return { customers, setCustomers }
})
