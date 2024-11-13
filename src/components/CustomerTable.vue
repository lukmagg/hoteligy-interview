<template>
  <table id="default-table">
    <thead>
      <tr>
        <th>
          <span class="flex items-center">
            First Name
            <svg
              class="w-4 h-4 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8 15 4 4 4-4m0-6-4-4-4 4"
              />
            </svg>
          </span>
        </th>
        <th>
          <span class="flex items-center">
            Last Name
            <svg
              class="w-4 h-4 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8 15 4 4 4-4m0-6-4-4-4 4"
              />
            </svg>
          </span>
        </th>
        <th>
          <span class="flex items-center">
            City
            <svg
              class="w-4 h-4 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8 15 4 4 4-4m0-6-4-4-4 4"
              />
            </svg>
          </span>
        </th>
        <th data-type="date" data-format="YYYY/DD/MM">
          <span class="flex items-center">
            Birthday
            <svg
              class="w-4 h-4 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8 15 4 4 4-4m0-6-4-4-4 4"
              />
            </svg>
          </span>
        </th>
        <th>
          <span class="flex items-center"> Actions </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customersStore.customers" :key="customer.id">
        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ customer.firstName }}
        </td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.city }}</td>
        <td>{{ customer.birthday }}</td>
        <td>
          <button
            @click="editCustomer(customer.id)"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            @click="deleteCustomer(customer.id)"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useCustomers } from '@/composables/useCustomers'
import { onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customersStore'
import { DataTable } from 'simple-datatables'

const customersStore = useCustomersStore()

onMounted(() => {
  useCustomers()
  const table = document.getElementById('default-table')
  if (table) {
    new DataTable(table, {
      searchable: false,
      perPageSelect: false,
    })
  }
})

const editCustomer = (id) => {
  console.log('edit: ' + id)
}

const deleteCustomer = (id) => {
  console.log('delete: ' + id)
}
</script>
