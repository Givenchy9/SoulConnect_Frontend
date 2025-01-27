<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h2 class="text-4xl font-bold text-gray-800 mb-4 md:mb-0">Beheer Gebruikers</h2>
      <!-- De "Nieuwe Gebruiker" knop is verwijderd -->
    </div>

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
              @click="sortBy('naam')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Naam
              <i :class="sortIcon('naam')"></i>
            </th>
            <th
              @click="sortBy('email')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Email
              <i :class="sortIcon('email')"></i>
            </th>
            <th
              @click="sortBy('abonnement')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              Abonnement
              <i :class="sortIcon('abonnement')"></i>
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="gebruiker in filteredAndSortedGebruikers"
            :key="gebruiker.id"
            @click="openDetailModal(gebruiker)"
            class="hover:bg-gray-50 transition duration-200 cursor-pointer"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ gebruiker.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center">
              <img :src="gebruiker.photoUrl" alt="Gebruikersfoto" class="w-10 h-10 rounded-full mr-4 object-cover" />
              {{ gebruiker.naam }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ gebruiker.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ gebruiker.abonnement.naam }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
              <button
                @click.stop="openEditModal(gebruiker)"
                class="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                title="Gebruiker bewerken"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click.stop="confirmDelete(gebruiker.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                title="Gebruiker verwijderen"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Geen gebruikers gevonden -->
      <div v-if="filteredAndSortedGebruikers.length === 0" class="p-6 text-center text-gray-500">
        Geen gebruikers gevonden.
      </div>
    </div>

    <!-- Edit Modal -->
    <transition name="modal">
      <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Gebruiker Bewerken</h3>

          <form @submit.prevent="updateGebruiker">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Email</label>
              <input
                v-model="editForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="bijv. jan@example.com"
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2">Abonnement</label>
              <select
                v-model="editForm.abonnementId"
                required
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option disabled value="">Selecteer een abonnement</option>
                <option v-for="abonnement in abonnementen" :key="abonnement.id" :value="abonnement.id">
                  {{ abonnement.naam }} - {{ formatCurrency(abonnement.prijs) }} / {{ abonnement.periode }} dagen
                </option>
              </select>
            </div>

            <div class="flex justify-end">
              <button
                type="button"
                @click="closeEditModal"
                class="mr-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Annuleren
              </button>
              <button
                type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Opslaan Wijzigingen
              </button>
            </div>
          </form>

          <!-- Sluitknop -->
          <button @click="closeEditModal" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal">
      <div v-if="isDeleteConfirmOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative animate-fade-in">
          <h3 class="text-2xl font-bold text-red-600 mb-4">Bevestig Verwijderen</h3>
          <p class="text-gray-700 mb-6">Weet je zeker dat je deze gebruiker wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.</p>
          <div class="flex justify-end">
            <button
              @click="isDeleteConfirmOpen = false"
              class="mr-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Annuleren
            </button>
            <button
              @click="confirmDeleteFinal"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Verwijderen
            </button>
          </div>
          <!-- Sluitknop -->
          <button @click="isDeleteConfirmOpen = false" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Gebruiker Detail Modal -->
    <transition name="modal">
      <div v-if="isDetailModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Gebruiker Details</h3>
          <div class="flex flex-col md:flex-row items-center mb-6">
            <img :src="selectedGebruiker.photoUrl" alt="Gebruikersfoto" class="w-40 h-40 rounded-full mr-6 object-cover mb-4 md:mb-0" />
            <div>
              <p><strong>ID:</strong> {{ selectedGebruiker.id }}</p>
              <p><strong>Naam:</strong> {{ selectedGebruiker.naam }}</p>
              <p><strong>Email:</strong> {{ selectedGebruiker.email }}</p>
              <p><strong>Abonnement:</strong> {{ selectedGebruiker.abonnement.naam }}</p>
              <p><strong>Periode:</strong> {{ selectedGebruiker.abonnement.periode }} dagen</p>
              <p><strong>Prijs:</strong> {{ formatCurrency(selectedGebruiker.abonnement.prijs) }}</p>
              <p><strong>Beschrijving:</strong> {{ selectedGebruiker.beschrijving }}</p>
              <p><strong>Status:</strong> 
                <span :class="selectedGebruiker.banned ? 'text-red-600' : 'text-green-600'">
                  {{ selectedGebruiker.banned ? 'Banned' : 'Actief' }}
                </span>
              </p>
              <p><strong>Account Aanmaakdatum:</strong> {{ formatDate(selectedGebruiker.accountCreated) }}</p>
              <p><strong>Laatste Login:</strong> {{ formatDate(selectedGebruiker.lastLogin) }}</p>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="openChatModal(selectedGebruiker!)"
              class="mr-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Chat
            </button>
            <button
              @click="toggleBan"
              class="mr-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              {{ selectedGebruiker.banned ? 'Unban' : 'Ban' }}
            </button>
            <button
              @click="closeDetailModal"
              class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Sluiten
            </button>
          </div>
          <!-- Sluitknop -->
          <button @click="closeDetailModal" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Chat Modal -->
    <transition name="modal">
      <div v-if="isChatModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Chat met {{ currentChatUser?.naam }}</h3>
          
          <div class="flex flex-col h-80 overflow-y-auto mb-4">
            <div 
              v-for="(message, index) in chats[currentChatUser.id]" 
              :key="index" 
              :class="{'text-right': message.sender === 'admin'}" 
              class="mb-2"
            >
              <span 
                :class="message.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'" 
                class="inline-block px-4 py-2 rounded-lg"
              >
                {{ message.text }}
              </span>
            </div>
          </div>

          <form @submit.prevent="sendMessage" class="flex">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Typ je bericht..."
              class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition duration-300"
            >
              Verzenden
            </button>
          </form>

          <!-- Sluitknop -->
          <button @click="closeChatModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Abonnement {
  id: number
  naam: string
  periode: number
  prijs: number
  beschrijving: string
}

interface Gebruiker {
  id: number
  naam: string
  email: string
  abonnement: Abonnement
  banned: boolean
  photoUrl: string
  accountCreated: Date
  lastLogin: Date
  beschrijving: string
}

interface Message {
  sender: 'admin' | 'user'
  text: string
}

const abonnementen = ref<Abonnement[]>([
  { id: 1, naam: 'Basis', periode: 30, prijs: 9.99, beschrijving: 'Basis abonnement met essentiële functies.' },
  { id: 2, naam: 'Premium', periode: 30, prijs: 19.99, beschrijving: 'Premium abonnement met extra functies en prioriteit support.' },
  { id: 3, naam: 'Enterprise', periode: 30, prijs: 49.99, beschrijving: 'Enterprise abonnement voor grote bedrijven met maatwerkoplossingen.' },
])

const gebruikers = ref<Gebruiker[]>([
  {
    id: 1,
    naam: 'Jan Jansen',
    email: 'jan.jansen@example.com',
    abonnement: abonnementen.value[0],
    banned: false,
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
    accountCreated: new Date('2023-01-15'),
    lastLogin: new Date('2024-04-10'),
    beschrijving: 'Beschrijving van Jan Jansen.',
  },
  {
    id: 2,
    naam: 'Piet Pietersen',
    email: 'piet.pietersen@example.com',
    abonnement: abonnementen.value[1],
    banned: false,
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
    accountCreated: new Date('2022-06-20'),
    lastLogin: new Date('2024-04-12'),
    beschrijving: 'Beschrijving van Piet Pietersen.',
  },
  {
    id: 3,
    naam: 'Klaas Klaassen',
    email: 'klaas.klaassen@example.com',
    abonnement: abonnementen.value[2],
    banned: true,
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=400',
    accountCreated: new Date('2021-11-05'),
    lastLogin: new Date('2024-04-08'),
    beschrijving: 'Beschrijving van Klaas Klaassen.',
  },
])

// Edit Modal State
const isEditModalOpen = ref(false)
const editForm = ref<{ id: number; email: string; abonnementId: number }>({
  id: 0,
  email: '',
  abonnementId: 0,
})

// Delete confirmation state
const isDeleteConfirmOpen = ref(false)
const gebruikerToDelete = ref<number | null>(null)

// Detail Modal state
const isDetailModalOpen = ref(false)
const selectedGebruiker = ref<Gebruiker | null>(null)

// Chat Modal state
const isChatModalOpen = ref(false)
const currentChatUser = ref<Gebruiker | null>(null)
const newMessage = ref('')

// Chats: Map user ID to array of messages
const chats = ref<{ [key: number]: Message[] }>({})

// Initialize chats for existing users
gebruikers.value.forEach(user => {
  if (!chats.value[user.id]) {
    chats.value[user.id] = []
  }
})

// Open Edit Modal
const openEditModal = (gebruiker: Gebruiker) => {
  editForm.value = {
    id: gebruiker.id,
    email: gebruiker.email,
    abonnementId: gebruiker.abonnement.id,
  }
  isEditModalOpen.value = true
}

// Close Edit Modal
const closeEditModal = () => {
  isEditModalOpen.value = false
}

// Update Gebruiker
const updateGebruiker = () => {
  const index = gebruikers.value.findIndex(g => g.id === editForm.value.id)
  const geselecteerdAbonnement = abonnementen.value.find(a => a.id === editForm.value.abonnementId)
  if (index !== -1 && geselecteerdAbonnement) {
    gebruikers.value[index].email = editForm.value.email
    gebruikers.value[index].abonnement = geselecteerdAbonnement
    // Update de laatste login naar nu
    gebruikers.value[index].lastLogin = new Date()
    closeEditModal()
  }
}

// Open Delete Confirmation
const confirmDelete = (id: number) => {
  gebruikerToDelete.value = id
  isDeleteConfirmOpen.value = true
}

// Confirm Delete
const confirmDeleteFinal = () => {
  if (gebruikerToDelete.value !== null) {
    gebruikers.value = gebruikers.value.filter(g => g.id !== gebruikerToDelete.value)
    delete chats.value[gebruikerToDelete.value] 
    gebruikerToDelete.value = null
    isDeleteConfirmOpen.value = false
  }
}

// Open Detail Modal
const openDetailModal = (gebruiker: Gebruiker) => {
  selectedGebruiker.value = gebruiker
  isDetailModalOpen.value = true
}

// Close Detail Modal
const closeDetailModal = () => {
  selectedGebruiker.value = null
  isDetailModalOpen.value = false
}

// Open Chat Modal
const openChatModal = (gebruiker: Gebruiker) => {
  currentChatUser.value = gebruiker
  isChatModalOpen.value = true
}

// Close Chat Modal
const closeChatModal = () => {
  currentChatUser.value = null
  isChatModalOpen.value = false
}

// Send Message
const sendMessage = () => {
  if (currentChatUser.value && newMessage.value.trim() !== '') {
    const message: Message = {
      sender: 'admin',
      text: newMessage.value.trim(),
    }
    chats.value[currentChatUser.value.id].push(message)
    newMessage.value = ''
    // De automatische 'Bedankt voor je bericht!' reactie is verwijderd
  }
}

// Toggle Ban/Unban
const toggleBan = () => {
  if (selectedGebruiker.value) {
    selectedGebruiker.value.banned = !selectedGebruiker.value.banned
  }
}

// Currency formatter
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value)
}

// Date formatter
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

// Sorteer functie
const sortBy = (key: 'id' | 'naam' | 'email' | 'abonnement') => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

// Sorteer iconen
const sortIcon = (key: 'id' | 'naam' | 'email' | 'abonnement') => {
  if (sortKey.value !== key) return 'fas fa-sort'

  return sortAsc.value ? 'fas fa-sort-up ml-1' : 'fas fa-sort-down ml-1'
}

// Filter en Sorteer gebruikers
const filteredAndSortedGebruikers = computed(() => {
  let result = gebruikers.value.filter(g =>
    g.naam.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    g.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    g.abonnement.naam.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  result = result.sort((a, b) => {
    let compareA, compareB

    switch (sortKey.value) {
      case 'id':
        compareA = a.id
        compareB = b.id
        break
      case 'naam':
        compareA = a.naam.toLowerCase()
        compareB = b.naam.toLowerCase()
        break
      case 'email':
        compareA = a.email.toLowerCase()
        compareB = b.email.toLowerCase()
        break
      case 'abonnement':
        compareA = a.abonnement.naam.toLowerCase()
        compareB = b.abonnement.naam.toLowerCase()
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

const sortKey = ref<'id' | 'naam' | 'email' | 'abonnement'>('id')
const sortAsc = ref(true)
const searchQuery = ref('')
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

.chat-message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.chat-message.admin {
  background-color: #3b82f6; 
  color: white;
  align-self: flex-end;
}

.chat-message.user {
  background-color: #e5e7eb; 
  color: #374151;
  align-self: flex-start;
}

.chat-container {
  display: flex;
  flex-direction: column;
}

.chat-container .messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.chat-input {
  display: flex;
}
</style>
