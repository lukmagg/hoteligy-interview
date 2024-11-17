import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCustomersStore = defineStore('customers', () => {
  let customers = ref([])
  let editMode = ref(false)

  function setCustomers(newCustomers) {
    customers.value.splice(0, customers.value.length, ...newCustomers)
  }

  function setEditMode(mode) {
    editMode.value = mode
  }

  function deleteCustomer(id) {
    const index = customers.value.findIndex((customer) => customer.id == id)

    if (index !== -1) {
      customers.value.splice(index, 1)
    }
  }

  return { customers, editMode, setCustomers, deleteCustomer, setEditMode }
})
