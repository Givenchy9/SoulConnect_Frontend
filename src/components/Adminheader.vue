<template>
    <div class="flex min-h-screen bg-gray-100">
      <aside class="w-64 bg-blue-800 text-white flex flex-col">
        <div class="p-4 flex items-center justify-center border-b border-blue-700">
          <h1 class="text-2xl font-bold">SoulConnect Admin</h1>
        </div>
  
        <!-- navigatie knoppen -->
        <nav class="flex-1 px-4 py-4">
          <ul class="space-y-3">
            <li>
              <RouterLink
                to="/dashboard/users_admin"
                class="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <i class="fas fa-users mr-2"></i>
                Gebruikers
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/dashboard/abonnoment_admin"
                class="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <i class="fas fa-credit-card mr-2"></i>
                Abonnementen
              </RouterLink>
            </li>
          </ul>
        </nav>
  
        <div class="p-4 border-t border-blue-700">
          <button
            class="w-full flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            Uitloggen
          </button>
        </div>
      </aside>

      <main class="flex-1 p-4">
        <RouterView />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterView, RouterLink } from 'vue-router'
  </script>