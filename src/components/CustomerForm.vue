<template>
  <div>
    <p>{{ customersStore.editMode ? 'Edit' : 'Create' }} customer</p>
  </div>
  <form class="max-w-md mx-auto" @submit.prevent="onSubmit">
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="firstName"
        type="text"
        name="floating_firstName"
        id="floating_firstName"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="floating_firstName"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >First name</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="lastName"
        type="text"
        name="floating_lastName"
        id="floating_lastName"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="floating_lastName"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Last name</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="city"
        type="text"
        name="floating_city"
        id="floating_city"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="floating_city"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >City</label
      >
    </div>

    <div>
      <VueDatePicker
        v-model="birthday"
        :inline="{ input: true }"
        text-input
        auto-apply
        :enable-time-picker="false"
      />
    </div>

    <button
      type="submit"
      class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useCustomersCrud } from '@/composables/useCustomersCrud'
import { toast } from 'vue3-toastify'
import { useCustomersStore } from '@/stores/customersStore'
import { formatDate } from '@/lib/formatDate'

// props
const props = defineProps(['customer'])

// store
const customersStore = useCustomersStore()

const { create, update } = useCustomersCrud()

// data
const customerId = ref(0)
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const birthday = ref(null)

// watchers
watch(
  () => props.customer,
  () => {
    customerId.value = props.customer.customerId
    firstName.value = props.customer.firstName
    lastName.value = props.customer.lastName
    city.value = props.customer.city
    birthday.value = props.customer.birthday
  },
  { deep: true },
)

// functions
const notify = () => {
  const message = customersStore.editMode
    ? 'Customer updated successfully !'
    : 'Customer created successfully !'
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

const notifyError = () => {
  toast.error('Birthday is required. Example format: 17/01/2024', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

const clearForm = () => {
  firstName.value = ''
  lastName.value = ''
  city.value = ''
  birthday.value = []
}

const onSubmit = async () => {
  if (birthday.value === null) {
    notifyError()
  } else {
    if (customersStore.editMode) {
      try {
        await update(customerId.value, {
          firstName: firstName.value,
          lastName: lastName.value,
          city: city.value,
          birthday: formatDate(birthday.value), // use slice for delete hours
        })
        notify()
      } catch (error) {
        console.error(error)
      }
    } else {
      // Create mode
      try {
        await create({
          firstName: firstName.value,
          lastName: lastName.value,
          city: city.value,
          birthday: formatDate(birthday.value),
        })
        notify()
        clearForm()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped></style>
