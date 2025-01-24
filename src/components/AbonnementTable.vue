<!-- src/components/AbonnementTable.vue -->
<template>
    <div class="mb-4">
        <input
          v-model="internalSearchQuery"
          @input="emitSearch"
          type="text"
          placeholder="Zoek abonnementen..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <!-- Zoekbalk binnen deze component -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th @click="sortBy('id')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              ID <i :class="getSortIcon('id')"></i>
            </th>
            <th @click="sortBy('naam')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Naam <i :class="getSortIcon('naam')"></i>
            </th>
            <th @click="sortBy('periode')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Periode <i :class="getSortIcon('periode')"></i>
            </th>
            <th @click="sortBy('prijs')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Prijs (€) <i :class="getSortIcon('prijs')"></i>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beschrijving</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="abonnement in filteredAbonnementen"
            :key="abonnement.id"
            class="hover:bg-gray-50 transition duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.naam }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.periode }} dagen</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ formatCurrency(abonnement.prijs) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ abonnement.beschrijving }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
              <button
                @click="$emit('edit', abonnement)"
                class="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                title="Abonnement bewerken"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="$emit('delete', abonnement)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                title="Abonnement verwijderen"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Geen abonnementen gevonden -->
      <div v-if="filteredAbonnementen.length === 0" class="p-6 text-center text-gray-500">
        Geen abonnementen gevonden.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, defineProps, defineEmits } from 'vue'
  
  // Interface voor een Abonnement
  interface Abonnement {
    id: number
    naam: string
    periode: number // Aantal dagen
    prijs: number
    beschrijving: string
  }
  
  // Props
  const props = defineProps<{
    abonnementen: Abonnement[]
    sortKey: 'id' | 'naam' | 'periode' | 'prijs'
    sortAsc: boolean
  }>()
  
  // Emits
  const emit = defineEmits<{
    (event: 'edit', abonnement: Abonnement): void
    (event: 'delete', abonnement: Abonnement): void
    (event: 'sort', key: 'id' | 'naam' | 'periode' | 'prijs'): void
    (event: 'update:searchQuery', query: string): void
  }>()
  
  // Zoekbalk binnen deze component
  const internalSearchQuery = ref('')
  watch(() => props.abonnementen, () => {
    internalSearchQuery.value = ''
  })
  
  // Emit de zoekopdracht naar de parent
  const emitSearch = () => {
    emit('update:searchQuery', internalSearchQuery.value)
  }
  
  // Sorteer functie
  const sortBy = (key: 'id' | 'naam' | 'periode' | 'prijs') => {
    emit('sort', key)
  }
  
  // Sorteer iconen
  const getSortIcon = (key: 'id' | 'naam' | 'periode' | 'prijs') => {
    if (props.sortKey !== key) return 'fas fa-sort'
    return props.sortAsc ? 'fas fa-sort-up ml-1' : 'fas fa-sort-down ml-1'
  }
  
  // Computed property voor gefilterde en gesorteerde abonnementen
  const filteredAbonnementen = computed(() => {
    let result = props.abonnementen.filter(a =>
      a.naam.toLowerCase().includes(internalSearchQuery.value.toLowerCase()) ||
      a.beschrijving.toLowerCase().includes(internalSearchQuery.value.toLowerCase())
    )
  
    // Sorteer de gefilterde resultaten
    result = result.sort((a, b) => {
      let compareA: string | number
      let compareB: string | number
  
      switch (props.sortKey) {
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
  
      if (compareA < compareB) return props.sortAsc ? -1 : 1
      if (compareA > compareB) return props.sortAsc ? 1 : -1
      return 0
    })
  
    return result
  })
  
  // Currency formatter
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
  }
  </script>
  