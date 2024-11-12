<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">City</th>
        <th scope="col">Birthdate</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="index">
        <th scope="row">1</th>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.city }}</td>
        <td>{{ customer.birthdate }}</td>
        <td>
          <button class="btn btn-primary btn-sm m-2" @click="editCustomer(index)">Edit</button>
          <button class="btn btn-primary btn-sm" @click="deleteCustomer(index)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const customers = [
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
  {
    firstName: 'Lucas',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/1986',
  },
  {
    firstName: 'Mousito',
    lastName: 'Maggio',
    city: 'Ushuaia',
    birthdate: '18/11/2007',
  },
]

const editCustomer = (index) => {
  console.log('edit:' + index)
}

const deleteCustomer = (index) => {
  console.log('delete: ' + index)
}
</script>
