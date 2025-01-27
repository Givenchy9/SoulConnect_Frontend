<template>
  <div class="box1 flex justify-center items-center p-0 px-16 w-full">
    <div class="box2 h-screen w-full bg-white rounded-2xl">
      <div class="box3 text-center pt-4 border-b">
        <div class="box4 p-2 py-12 mx-auto bg-gradient-to-b from-kleur to-pink-500 rounded-2xl shadow">
          <div class="">
            <img class="img mx-auto border-4 border-white dark:border-gray-800 shadow-lg" alt="User Avatar"
              :src="profileImage" />
            <h3 class="mt-4 text-xl font-bold text-white dark:text-white">
              {{ "naam" }}
            </h3>
            <div class="mt-2 text-white dark:text-gray-300">
              <p>{{ "email" }}</p>
            </div>
            <button @click="openModal"
              class="flex shadow-xl w-1/2 m-auto justify-center rounded-md bg-koranje mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-doranje focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Edit
              Picture<i class="fa-solid fa-pen-to-square px-3 py-1.5"></i></button>
            <div class="container mx-auto mt-2">
            </div>
          </div>
          <button @click="isExpanded = !isExpanded"
            class="flex shadow-xl w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            {{ isExpanded ? "Hide Details" : "Show Details" }}
            <i :class="isExpanded ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down'" class="mr-2 px-3 py-1.5"></i>
          </button>
          <div v-if="isExpanded" class="mt-4 rounded">
            <div class="table w-full overflow-x-auto">
              <table class="bg-gradient-to-l from-kleur to-pink-500 min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Oud</th>
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Nieuw</th>
                    <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableData" :key="index">
                    <td class="bg-white border border-gray-300 px-4 py-2">{{ row.company }}</td>
                    <td class="bg-white border border-gray-300 px-4 py-2">{{ row.contact }}</td>
                    <td class="bg-white border border-gray-300 px-4 py-2">
                      <button
                        class="flex shadow-xl w-full justify-center rounded-md bg-kleur px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">edit<i
                          class="fa-solid fa-pen-to-square px-3 py-1.5"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              class="float-right mt-1 ml-2 shadow-xl w-1/3 justify-center rounded-md bg-green-500 mt-1.5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Send
              <i class="fa-solid fa-paper-plane"></i></button>
            <button
              class="float-right mt-1 shadow-xl w-1/3 justify-center rounded-md bg-red-600 mt-1.5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Delete Account
              <i class="fa-solid fa-user-slash"></i></button>
          </div>
        </div>

        <!-- Modal for Profile Picture Upload -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white p-8 rounded-lg w-96">
            <h2 class="text-xl font-bold mb-4">Edit Profile Picture</h2>
            <input type="file" @change="onFileChange" accept="image/*" class="mb-4 p-2 border" />
            <div class="flex justify-between">
              <button @click="closeModal"
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">Cancel</button>
              <button @click="saveProfileImage"
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive states
const profileImage = ref(''); // Default profile image URL
const isModalOpen = ref(false); // Controls modal visibility

// Open modal for editing profile picture
function openModal() {
  isModalOpen.value = true;
}

// Close modal
function closeModal() {
  isModalOpen.value = false;
}

// Handle file selection for new image
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // Set the new profile image
    };
    reader.readAsDataURL(file);
  }
}

// Save the selected profile image (you can add further logic here to handle the image saving)
function saveProfileImage() {
  // You can send this image to your server or handle it as needed
  console.log('Profile image saved:', profileImage.value);
  closeModal();
}

// Example table data (you can replace it with actual data or fetch from an API)
const tableData = ref([
  { company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany' },
  { company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico' },
  { company: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
  { company: 'Island Trading', contact: 'Helen Bennett', country: 'UK' },
  { company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada' },
  { company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy' },
]);

const isExpanded = ref(false);
</script>

<style scoped>
.img {
  height: 400px;
}

/* Responsiveness */
@media (max-width: 800px) {
  .box1 {
    padding: 0;
    margin-top: 10px;
  }

  .box2 {
    background-image: none;
  }

  .box3 {
    padding: 0;
  }

  .box4 {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .table {
    height: 2vh;
    overflow: auto;
    margin: auto;
    padding: 0px;
  }
}
</style>




<!-- <div class="box3">
  <img class="h-24 w-80 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
    alt="User Avatar" @click="openModal" :src="profileImage" />
  <h3 class="mt-4 text-xl font-bold text-white dark:text-white">
    {{ "naam" }}
  </h3>
  <div class="mt-2 text-white dark:text-gray-300">
    <p>{{ "email" }}</p>
  </div>
  <div class="container mx-auto mt-10">
  </div>
</div>
<div class="table w-full overflow-x-auto">
  <table class="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-200">
        <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Oud</th>
        <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Nieuw</th>
        <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="index" :class="index % 2 === 0 ? 'bg-gray-100' : ''">
        <td class="bg-white border border-gray-300 px-4 py-2">{{ row.company }}</td>
        <td class="bg-white border border-gray-300 px-4 py-2">{{ row.contact }}</td>
        <td class="bg-white border border-gray-300 px-4 py-2">
          <button
            class="flex shadow-xl w-full justify-center rounded-md bg-kleur px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">edit<i
              class="fa-solid fa-pen-to-square px-3 py-1.5"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<button
  class="float-right shadow-xl w-1/3 justify-center rounded-md bg-green-500 mt-1.5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Send
  <i class="fa-solid fa-paper-plane"></i></button>
</div>
</div>
</div> -->
