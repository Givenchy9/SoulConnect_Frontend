<template>
    <div class="p-8 bg-gray-100 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-semibold text-gray-800">Beheer Abonnementen</h2>
        <button
          @click="openAddModal"
          class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <i class="fas fa-plus mr-2"></i> Nieuw Abonnement
        </button>
      </div>
      
      <!-- Abonnementen Tabel -->
      <div class="bg-white shadow rounded-lg overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prijs</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beschrijving</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="abonnement in abonnements" :key="abonnement.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.naam }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.periode }} dagen</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ formatCurrency(abonnement.prijs) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.beschrijving }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                <button
                  @click="openEditModal(abonnement)"
                  class="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  <i class="fas fa-edit"></i> Bewerken
                </button>
                <button
                  @click="confirmDelete(abonnement.id)"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <i class="fas fa-trash-alt"></i> Verwijderen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Geen abonnementen gevonden -->
        <div v-if="abonnements.length === 0" class="p-6 text-center text-gray-500">
          Geen abonnementen gevonden.
        </div>
      </div>
      
      <!-- Add/Edit Modal -->
      <transition name="modal">
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h3 class="text-2xl font-semibold mb-4">{{ isEditMode ? 'Abonnement Bewerken' : 'Nieuw Abonnement Toevoegen' }}</h3>
            
            <form @submit.prevent="isEditMode ? updateAbonnement() : addAbonnement()">
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Naam</label>
                <input
                  v-model="form.naam"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bijv. Premium"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Periode (dagen)</label>
                <input
                  v-model.number="form.periode"
                  type="number"
                  min="1"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bijv. 30"
                />
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Prijs (€)</label>
                <input
                  v-model.number="form.prijs"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bijv. 19.99"
                />
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Beschrijving</label>
                <textarea
                  v-model="form.beschrijving"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Beschrijving van het abonnement..."
                ></textarea>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="button"
                  @click="closeModal"
                  class="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {{ isEditMode ? 'Opslaan Wijzigingen' : 'Abonnement Toevoegen' }}
                </button>
              </div>
            </form>
            
            <!-- Sluitknop -->
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      </transition>
      
      <!-- Delete Confirmation Modal -->
      <transition name="modal">
        <div v-if="isDeleteConfirmOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 class="text-2xl font-semibold mb-4">Bevestig Verwijderen</h3>
            <p class="mb-6 text-gray-700">Weet je zeker dat je dit abonnement wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.</p>
            
            <div class="flex justify-end">
              <button
                @click="isDeleteConfirmOpen = false"
                class="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Annuleren
              </button>
              <button
                @click="confirmDeleteFinal"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      </transition>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Interface voor een Abonnement
  interface Abonnement {
    id: number
    naam: string
    periode: number // Aantal dagen
    prijs: number
    beschrijving: string
  }
  
  // Reactive data met testgegevens
  const abonnements = ref<Abonnement[]>([
    { id: 1, naam: 'Basis', prijs: 9.99, periode: 30, beschrijving: 'Basis abonnement met essentiële functies.' },
    { id: 2, naam: 'Premium', prijs: 19.99, periode: 30, beschrijving: 'Premium abonnement met extra functies en prioriteit support.' },
    { id: 3, naam: 'Enterprise', prijs: 49.99, periode: 30, beschrijving: 'Enterprise abonnement voor grote bedrijven met maatwerkoplossingen.' },
  ])
  
  // Form data
  const form = ref<Abonnement>({
    id: 0,
    naam: '',
    periode: 0,
    prijs: 0,
    beschrijving: '',
  })
  
  // Modal state
  const isModalOpen = ref(false)
  const isEditMode = ref(false)
  
  // Delete confirmation state
  const isDeleteConfirmOpen = ref(false)
  const abonnementToDelete = ref<number | null>(null)
  
  // Open de modal voor het toevoegen van een nieuw abonnement
  const openAddModal = () => {
    isEditMode.value = false
    form.value = { id: 0, naam: '', periode: 0, prijs: 0, beschrijving: '' }
    isModalOpen.value = true
  }
  
  // Open de modal voor het bewerken van een bestaand abonnement
  const openEditModal = (abonnement: Abonnement) => {
    isEditMode.value = true
    form.value = { ...abonnement }
    isModalOpen.value = true
  }
  
  // Sluit de modal
  const closeModal = () => {
    isModalOpen.value = false
  }
  
  // Voeg een nieuw abonnement toe
  const addAbonnement = () => {
    const nieuweId = abonnements.value.length > 0 ? Math.max(...abonnements.value.map(a => a.id)) + 1 : 1
    abonnements.value.push({ ...form.value, id: nieuweId })
    closeModal()
  }
  
  // Update een bestaand abonnement
  const updateAbonnement = () => {
    const index = abonnements.value.findIndex(a => a.id === form.value.id)
    if (index !== -1) {
      abonnements.value[index] = { ...form.value }
    }
    closeModal()
  }
  
  // Open delete bevestiging
  const confirmDelete = (id: number) => {
    abonnementToDelete.value = id
    isDeleteConfirmOpen.value = true
  }
  
  // Bevestig verwijderen
  const confirmDeleteFinal = () => {
    if (abonnementToDelete.value !== null) {
      abonnements.value = abonnements.value.filter(a => a.id !== abonnementToDelete.value)
      abonnementToDelete.value = null
      isDeleteConfirmOpen.value = false
    }
  }
  
  // Currency formatter
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
  }
  </script>
  
  <style scoped>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s;
  }
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
  
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -70px;
    
    /* Fade in */
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  </style>
  