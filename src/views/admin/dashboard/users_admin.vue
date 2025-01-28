<template>
  <div>
    <!-- Zoekbalk -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Zoek gebruikers..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Gebruikers Tabel -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              @click="sortBy('id')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              ID
              <i :class="sortIcon('id')"></i>
            </th>
            <th
              @click="sortBy('nickname')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Naam
              <i :class="sortIcon('nickname')"></i>
            </th>
            <th
              @click="sortBy('email')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Email
              <i :class="sortIcon('email')"></i>
            </th>
            <th
              @click="sortBy('status')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Status
              <i :class="sortIcon('status')"></i>
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.nickname }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <button @click="banUser(user.id)" class="bg-red-500 text-white px-4 py-2 rounded">Ban</button>
              <button @click="unbanUser(user.id)" class="bg-green-500 text-white px-4 py-2 rounded">Unban</button>
              <button @click="openEditModal(user)" class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
        <h2 class="text-xl font-semibold mb-4">Edit User</h2>
        <input v-model="editUser.nickname" type="text" placeholder="Nickname" class="w-full p-2 border rounded mb-4" />
        <select v-model="editUser.status" class="w-full p-2 border rounded mb-4">
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
          <option value="Deleted">Deleted</option>
        </select>
        <div class="mt-4 flex justify-end">
          <button class="bg-gray-500 text-white py-2 px-4 rounded mr-2" @click="closeEditModal">Cancel</button>
          <button class="bg-blue-500 text-white py-2 px-4 rounded" @click="updateUser">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Reactive properties
const users = ref([]);
const searchQuery = ref('');
const showEditModal = ref(false);
const editUser = ref({ id: '', nickname: '', status: '' });
const token = localStorage.getItem('token') || '';
const sortKey = ref('');
const sortOrder = ref(1); // 1 for ascending, -1 for descending

// Fetch users from the backend
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fetched users:', response.data.user); // Debug log
    users.value = Array.isArray(response.data.user) ? response.data.user : [];
    // Add a dummy user if the users array is empty
    if (users.value.length === 0) {
      users.value.push({
        id: 'dummy-id',
        nickname: 'Dummy User',
        email: 'dummy@example.com',
        status: 'Active',
      });
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    // Add a dummy user in case of an error
    users.value.push({
      id: 'dummy-id',
      nickname: 'Dummy User',
      email: 'dummy@example.com',
      status: 'Active',
    });
  }
};

// Computed property for filtered users
const filteredUsers = computed(() => {
  let sortedUsers = [...users.value];
  if (sortKey.value) {
    sortedUsers.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return -sortOrder.value;
      if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value;
      return 0;
    });
  }
  return sortedUsers.filter(user =>
    user.nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Open edit modal
const openEditModal = (user) => {
  editUser.value = { ...user };
  showEditModal.value = true;
};

// Close edit modal
const closeEditModal = () => {
  showEditModal.value = false;
};

// Update user
const updateUser = async () => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/users/${editUser.value.id}/update`, {
      nickname: editUser.value.nickname,
      status: editUser.value.status,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User updated successfully:', response.data);
    closeEditModal();
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};

// Ban user
const banUser = async (userId) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}/ban`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User banned successfully:', response.data);
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Failed to ban user:', error);
  }
};

// Unban user
const unbanUser = async (userId) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}/unban`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User unbanned successfully:', response.data);
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Failed to unban user:', error);
  }
};

// Sort by key
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value; // Toggle sort order
  } else {
    sortKey.value = key;
    sortOrder.value = 1; // Default to ascending
  }
};

// Get sort icon class
const sortIcon = (key) => {
  if (sortKey.value === key) {
    return sortOrder.value === 1 ? 'fa fa-sort-up' : 'fa fa-sort-down';
  }
  return 'fa fa-sort';
};

// Fetch users on component mount
onMounted(fetchUsers);
</script>

<style scoped>
/* Animaties voor modals */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>