<template>
  <nav class="w-full h-28 bg-orange-500 opacity-80 flex items-center justify-between px-8 relative">
    <h2 class="text-white text-2xl font-bold">SoulConnect</h2>

    <!-- Burger menu op mobiel -->
    <div @click="toggleMobileMenu" class="lg:hidden text-white text-2xl cursor-pointer">
      <i class="fas fa-bars"></i>
    </div>

    <div class="space-x-6 flex-grow justify-center lg:flex hidden">
      <RouterLink to="/homepage" class="text-white text-lg hover:underline">Homepage</RouterLink>
      <RouterLink to="/chat" class="text-white text-lg hover:underline">Chat</RouterLink>
      <RouterLink to="/matches" class="text-white text-lg hover:underline">Matches</RouterLink>
      <RouterLink to="/search" class="text-white text-lg hover:underline">Search</RouterLink>
    </div>

    <RouterLink to="/notificatie" class="text-white text-2xl mr-4 lg:block hidden">
      <i class="fa-solid fa-bell text-white h-6 w-6"></i>
    </RouterLink>

    <!-- Gebruiker dropdown -->
    <div class="relative lg:block hidden">
      <div @click="toggleDropdown" class="flex items-center text-2xl space-x-4 cursor-pointer">
        <i class="fas fa-user-circle text-white h-6 w-6"></i>
        <span class="text-white text-lg">Mohamad</span>
      </div>

      <!-- Dropdown menu -->
      <div v-if="dropdownOpen" class="absolute right-0 bg-white text-black shadow-lg mt-2 w-40 rounded-md">
        <RouterLink to="/settings" class="block px-4 py-2 hover:bg-gray-200">Settings</RouterLink>
        <RouterLink to="/login" class="block px-4 py-2 hover:bg-gray-200">Logout</RouterLink>
      </div>
    </div>
  </nav>

  <!-- Hamburger menu voor mobiel -->
  <div v-if="mobileMenuOpen" class="lg:hidden relative left-0 w-full bg-orange-500 opacity-80 px-8 py-4">
    <RouterLink to="/homepage" class="block text-white text-lg py-2">Homepage</RouterLink>
    <RouterLink to="/chat" class="block text-white text-lg py-2">Chat</RouterLink>
    <RouterLink to="/matches" class="block text-white text-lg py-2">Matches</RouterLink>
    <RouterLink to="/search" class="block text-white text-lg py-2">Search</RouterLink>

    <div @click="toggleDropdown" class="block text-white text-lg py-2 cursor-pointer">
      <i class="fas fa-user-circle text-white h-8 w-8"></i> Profiel
    </div>
    <!-- Dropdown menu binnen hamburger menu -->
    <div v-if="dropdownOpen" class="bg-white text-black shadow-lg mt-2 w-full rounded-md">
      <RouterLink to="/settings" class="block px-4 py-2 hover:bg-gray-200">Settings</RouterLink>
      <RouterLink to="/login" class="block px-4 py-2 hover:bg-gray-200">Logout</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
