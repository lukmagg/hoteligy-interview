<template>
  <div>
    <p>Add customer</p>
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

    <vue-tailwind-datepicker v-model="birthday" as-single />

    <button
      type="submit"
      class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { useCustomersCrud } from '@/composables/useCustomersCrud'
import { toast } from 'vue3-toastify'

const { create } = useCustomersCrud()

// data
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const birthday = ref([])

// functions
const notify = () => {
  toast.success('Customer created successfully !', {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}

const notifyError = () => {
  toast.error('Birthday is required', {
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
  if (birthday.value.length === 0) {
    notifyError()
  } else {
    try {
      await create({
        firstName: firstName.value,
        lastName: lastName.value,
        city: city.value,
        birthday: birthday.value[0],
      })
      notify()
      clearForm()
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped></style>
