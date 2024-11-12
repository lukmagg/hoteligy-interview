import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([])
  const myNum = ref(0)

  function setCustomers(newCustomers) {
    customers.value = newCustomers
  }

  function setMyNum() {
    myNum.value = 100
  }

  return { customers, myNum, setCustomers, setMyNum }
})
