<template>
  <CustomerFormEdit :customer="{ customerId, firstName, lastName, city, birthday }" />
</template>

<script setup>
import CustomerFormEdit from '@/components/CustomerFormEdit.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomersStore } from '@/stores/customersStore'

// store
const customersStore = useCustomersStore()

// router
const route = useRoute()

// data
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const birthday = ref('')
const customerId = ref(0)

onMounted(() => {
  const id = route.params.id

  // get customer from store with this id
  const customer = customersStore.customers.filter((c) => c.id == id)[0]

  firstName.value = customer.firstName
  lastName.value = customer.lastName
  city.value = customer.city
  birthday.value = customer.birthday
  customerId.value = customer.id
})
</script>
