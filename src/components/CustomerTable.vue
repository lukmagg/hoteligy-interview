<template>
  <div class="overflow-x-auto" v-show="!isLoading">
    <div class="min-w-full">
      <table id="sorting-table">
        <thead>
          <tr>
            <th @click="initTable()">
              <span class="flex items-center">
                ID
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
            <th @click="initTable()">
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
            <th @click="initTable()">
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
            <th @click="initTable()">
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
                birthday
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
        <tbody :key="renderKey">
          <tr v-for="customer in customersStore.customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ customer.firstName }}
            </td>
            <td>{{ customer.lastName }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.birthday }}</td>
            <td class="flex flex-col">
              <button
                @click="() => editCustomer(customer.id)"
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
import { ref, onMounted, watch } from 'vue'
import { useCustomersStore } from '@/stores/customersStore'
import { DataTable } from 'simple-datatables'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()

// data
const isLoading = ref(true)
const myTable = ref(null)
const renderKey = ref(0)
const forceRender = ref(false)

// store
const customersStore = useCustomersStore()

//composables
const { get, remove } = useCustomersCrud()

const notify = () => {
  toast.success('Customer deleted successfully !', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

async function initTable() {
  await get()

  myTable.value = new DataTable('#sorting-table', {
    searchable: false, // enable or disable searching
    sensitivity: 'base', // set the search sensitivity (base, accent, case, variant)
    searchQuerySeparator: ' ', // set the search query separator
    paging: false,
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
  isLoading.value = false
}

const editCustomer = (id) => {
  router.push({ name: 'customersEdit', params: { id } })
}

watch(
  () => customersStore.customers,
  () => {
    if (forceRender.value) renderKey.value++
  },
  { deep: true },
)

const deleteCustomer = async (id) => {
  forceRender.value = true
  await remove(id)
  notify()
  forceRender.value = false
}

// lifecycle
onMounted(async () => {
  initTable()
})
</script>
