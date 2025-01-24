<!-- src/views/BeheerAbonnementen.vue -->
<template>
    <div class="p-8 bg-gray-100 min-h-screen">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">Beheer Abonnementen</h2>
        <button
          @click="openModal('add')"
          class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <i class="fas fa-plus mr-2"></i> Nieuw Abonnement
        </button>
      </div>
  
      <!-- Abonnementen Tabel -->
      <AbonnementTable
        :abonnementen="filteredAbonnementen"
        :sortKey="sortKey"
        :sortAsc="sortAsc"
        @edit="openModal('edit', $event)"
        @delete="openDeleteConfirm($event)"
        @sort="sortBy"
        @update:searchQuery="updateSearchQuery"
      />
  
      <!-- Add/Edit Abonnement Modal -->
      <transition name="modal">
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative animate-fade-in">
            <h3 class="text-2xl font-semibold text-gray-800 mb-6">{{ modalType === 'edit' ? 'Abonnement Bewerken' : 'Nieuw Abonnement Toevoegen' }}</h3>
  
            <form @submit.prevent="modalType === 'edit' ? updateAbonnement() : addAbonnement()">
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
  
              <div class="mb-6">
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
                  {{ modalType === 'edit' ? 'Opslaan Wijzigingen' : 'Abonnement Toevoegen' }}
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
  
      <!-- Delete Confirm Modal -->
      <transition name="modal">
        <div v-if="isDeleteConfirmOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative animate-fade-in">
            <h3 class="text-2xl font-semibold text-red-600 mb-4">Bevestig Verwijderen</h3>
            <p class="text-gray-700 mb-6">Weet je zeker dat je dit abonnement wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.</p>
            <div class="flex justify-end">
              <button
                @click="closeDeleteConfirm"
                class="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Annuleren
              </button>
              <button
                @click="deleteAbonnement()"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Verwijderen
              </button>
            </div>
            <!-- Sluitknop -->
            <button @click="closeDeleteConfirm" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import AbonnementTable from '@/components/AbonnementTable.vue'
  
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
  
  // Zoek- en sorteer state
  const searchQuery = ref('')
  const sortKey = ref<'id' | 'naam' | 'periode' | 'prijs'>('id')
  const sortAsc = ref(true)
  
  // Modal state
  const isModalOpen = ref(false)
  const modalType = ref<'add' | 'edit'>('add')
  const currentAbonnement = ref<Abonnement | null>(null)
  
  // Delete confirmation state
  const isDeleteConfirmOpen = ref(false)
  const abonnementToDelete = ref<Abonnement | null>(null)
  
  // Form data
  const form = ref<Partial<Abonnement>>({
    id: 0,
    naam: '',
    periode: 0,
    prijs: 0,
    beschrijving: '',
  })
  
  // Computed property voor gefilterde en gesorteerde abonnementen
  const filteredAbonnementen = computed(() => {
    let result = abonnements.value.filter(a =>
      a.naam.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.beschrijving.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  
    result = result.sort((a, b) => {
      let compareA: string | number
      let compareB: string | number
  
      switch (sortKey.value) {
        case 'id':
          compareA = a.id
          compareB = b.id
          break
        case 'naam':
          compareA = a.naam.toLowerCase()
          compareB = b.naam.toLowerCase()
          break
        case 'periode':
          compareA = a.periode
          compareB = b.periode
          break
        case 'prijs':
          compareA = a.prijs
          compareB = b.prijs
          break
        default:
          compareA = a.id
          compareB = b.id
      }
  
      if (compareA < compareB) return sortAsc.value ? -1 : 1
      if (compareA > compareB) return sortAsc.value ? 1 : -1
      return 0
    })
  
    return result
  })
  
  // Functies
  
  // Open modal voor toevoegen of bewerken
  const openModal = (type: 'add' | 'edit', abonnement: Abonnement | null = null) => {
    modalType.value = type
    if (type === 'edit' && abonnement) {
      currentAbonnement.value = abonnement
      form.value = { ...abonnement }
    } else {
      currentAbonnement.value = null
      form.value = { id: 0, naam: '', periode: 0, prijs: 0, beschrijving: '' }
    }
    isModalOpen.value = true
  }
  
  // Sluit modal
  const closeModal = () => {
    isModalOpen.value = false
    currentAbonnement.value = null
    form.value = { id: 0, naam: '', periode: 0, prijs: 0, beschrijving: '' }
  }
  
  // Voeg een nieuw abonnement toe
  const addAbonnement = () => {
    if (form.value.naam && form.value.periode && form.value.prijs !== undefined && form.value.beschrijving) {
      const nieuweId = abonnements.value.length > 0 ? Math.max(...abonnements.value.map(a => a.id)) + 1 : 1
      abonnements.value.push({
        id: nieuweId,
        naam: form.value.naam,
        periode: form.value.periode,
        prijs: form.value.prijs,
        beschrijving: form.value.beschrijving,
      })
      closeModal()
    }
  }
  
  // Update een bestaand abonnement
  const updateAbonnement = () => {
    if (currentAbonnement.value && form.value.naam && form.value.periode && form.value.prijs !== undefined && form.value.beschrijving) {
      const index = abonnements.value.findIndex(a => a.id === currentAbonnement.value!.id)
      if (index !== -1) {
        abonnements.value[index] = {
          id: currentAbonnement.value.id,
          naam: form.value.naam,
          periode: form.value.periode,
          prijs: form.value.prijs,
          beschrijving: form.value.beschrijving,
        }
        closeModal()
      }
    }
  }
  
  // Open delete bevestiging
  const openDeleteConfirm = (abonnement: Abonnement) => {
    abonnementToDelete.value = abonnement
    isDeleteConfirmOpen.value = true
  }
  
  // Sluit delete bevestiging
  const closeDeleteConfirm = () => {
    isDeleteConfirmOpen.value = false
    abonnementToDelete.value = null
  }
  
  // Verwijder abonnement
  const deleteAbonnement = () => {
    if (abonnementToDelete.value) {
      abonnements.value = abonnements.value.filter(a => a.id !== abonnementToDelete.value!.id)
      closeDeleteConfirm()
    }
  }
  
  // Sorteer functie
  const sortBy = (key: 'id' | 'naam' | 'periode' | 'prijs') => {
    if (sortKey.value === key) {
      sortAsc.value = !sortAsc.value
    } else {
      sortKey.value = key
      sortAsc.value = true
    }
  }
  
  // Update de zoekopdracht vanuit de tabel component
  const updateSearchQuery = (query: string) => {
    searchQuery.value = query
  }
  
  // Sorteer iconen (hier in de component, wordt gebruikt in de tabel)
  const getSortIcon = (key: 'id' | 'naam' | 'periode' | 'prijs') => {
    if (sortKey.value !== key) return 'fas fa-sort'
    return sortAsc.value ? 'fas fa-sort-up ml-1' : 'fas fa-sort-down ml-1'
  }
  
  // Currency formatter
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
  }
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
  