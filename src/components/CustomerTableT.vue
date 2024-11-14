<template>
  <div class="overflow-x-auto" v-show="!isLoading">
    <div class="min-w-full">
      <table id="default-table">
        <thead>
          <tr>
            <th>
              <span class="flex items-center">
                First Namexx
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
          <tr v-for="customer in customers" :key="customer.id">
            <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ customer.firstName }}
            </td>
            <td>{{ customer.lastName }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.birthday }}</td>
            <td class="flex flex-col">
              <button
                @click="() => editCustomer(customer.firstLast)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                :data-edit-id="customer.id"
              >
                Edit
              </button>
              <button
                @click="() => deleteCustomer(customer.id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                :data-delete-id="customer.id"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-show="isLoading">Loading...</div>
</template>

<script setup>
import { useCustomersCrud } from '@/composables/useCustomersCrud'
import { ref, onMounted, computed } from 'vue'
import { useCustomersStore } from '@/stores/customersStore'
import { DataTable } from 'simple-datatables'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()
// data
const isLoading = ref(true)

// store
const customersStore = useCustomersStore()

//composables
const { get, remove } = useCustomersCrud()

// computed properties
const customers = computed(() => customersStore.customers)

const notify = () => {
  toast.success('Customer deleted successfully !', {
    position: toast.POSITION.TOP_CENTER,
  })
}
function initTable() {
  new DataTable('#default-table', {
    paging: true, // enable or disable paginatione
    perPage: 8, // set the number of rows per page
    perPageSelect: [8, 20, 50], // set the number of rows per page options
    firstLast: true, // enable or disable the first and last buttons
    nextPrev: true, // enable or disable the next and previous buttons
    searchable: true, // enable or disable searching
    sensitivity: 'base', // set the search sensitivity (base, accent, case, variant)
    searchQuerySeparator: ' ', // set the search query separator
  })

  // Edit button list
  const editButtons = document.querySelectorAll('button[data-edit-id]')
  editButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      const customerId = event.target.getAttribute('data-edit-id')
      editCustomer(customerId)
    })
  })

  // Delete button list
  const deleteButtons = document.querySelectorAll('button[data-delete-id]')
  deleteButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      const customerId = event.target.getAttribute('data-delete-id')

      deleteCustomer(customerId)
    })
  })
}

const editCustomer = (id) => {
  router.push({ name: 'customersEdit', params: { id } })
}

const deleteCustomer = async (id) => {
  await remove(id)
  notify()
}

// lifecycle
onMounted(async () => {
  await get()
  // El problema esta al hacer initTable porque pierde la reactividad
  initTable()
  isLoading.value = false
})
</script>
