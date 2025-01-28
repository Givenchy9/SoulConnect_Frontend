<template>
  <div class="box1 flex justify-center items-center p-0 px-16 w-full">
    <div class="box2 h-screen w-full bg-white rounded-2xl">
      <div class="box3 text-center pt-4 border-b">
        <div class="box4 p-2 py-12 mx-auto bg-gradient-to-b from-kleur to-pink-500 rounded-2xl shadow">
          <div class="">
            <img class="img mx-auto border-4 border-white dark:border-gray-800 shadow-lg" alt="User Avatar"
              :src="user.profile_image || 'default-image-url'" />
            <h3 class="mt-4 text-xl font-bold text-white dark:text-white">
              {{ user.nickname }}
            </h3>
            <div class="mt-2 text-white dark:text-gray-300">
              <p>{{ user.email }}</p>
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
            <form @submit.prevent="updateProfile">
              <div class="table w-full overflow-x-auto">
                <table class="bg-gradient-to-l from-kleur to-pink-500 min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Field</th>
                      <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Current Value</th>
                      <th class="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">New Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="bg-white border border-gray-300 px-4 py-2">Nickname</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">{{ user.nickname }}</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">
                        <input v-model="form.nickname" type="text" class="w-full px-2 py-1 border rounded" />
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-white border border-gray-300 px-4 py-2">Email</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">{{ user.email }}</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">
                        <input v-model="form.email" type="email" class="w-full px-2 py-1 border rounded" />
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-white border border-gray-300 px-4 py-2">Oneliner</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">{{ user.oneliner }}</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">
                        <input v-model="form.oneliner" type="text" class="w-full px-2 py-1 border rounded" />
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-white border border-gray-300 px-4 py-2">Profile Text</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">{{ user.profile_text }}</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">
                        <textarea v-model="form.profile_text" class="w-full px-2 py-1 border rounded"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-white border border-gray-300 px-4 py-2">Gender</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">{{ user.gender }}</td>
                      <td class="bg-white border border-gray-300 px-4 py-2">
                        <select v-model="form.gender" class="w-full px-2 py-1 border rounded">
                          <option value="Man">Man</option>
                          <option value="Vrouw">Vrouw</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button type="submit"
                class="float-right mt-1 ml-2 shadow-xl w-1/3 justify-center rounded-md bg-green-500 mt-1.5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Save
                Changes</button>
            </form>
            <button @click="deleteAccount"
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive states
const isModalOpen = ref(false); // Controls modal visibility
const isExpanded = ref(false);
const user = ref({});
const form = ref({
  nickname: '',
  email: '',
  oneliner: '',
  profile_text: '',
  gender: ''
});

// Fetch current user data
onMounted(async () => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.value = response.data.user;
    form.value.nickname = user.value.nickname;
    form.value.email = user.value.email;
    form.value.oneliner = user.value.oneliner;
    form.value.profile_text = user.value.profile_text;
    form.value.gender = user.value.gender;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

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
      user.value.profile_image = e.target.result; // Set the new profile image
    };
    reader.readAsDataURL(file);
  }
}

// Save the selected profile image
async function saveProfileImage() {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('profile_image', user.value.profile_image);

  try {
    await axios.post('http://127.0.0.1:8000/api/user/profile/image', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Profile image updated successfully!');
    closeModal();
  } catch (error) {
    console.error('Error updating profile image:', error);
    alert('Failed to update profile image.');
  }
}

// Update user profile
async function updateProfile() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put('http://127.0.0.1:8000/api/user/profile', form.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.value = response.data.user;
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
  }
}

// Delete account
async function deleteAccount() {
  if (confirm('Are you sure you want to delete your account?')) {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://127.0.0.1:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Account deleted successfully!');
      // Redirect to login or home page
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  }
}
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