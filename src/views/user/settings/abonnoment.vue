<template>
  <div class="box m-auto">
    <!-- Subscription Options (Visible only if NOT subscribed) -->
    <div v-if="!isSubscribed" class="sub flex mx-auto mt-8 px-12 gap-6 ml-28 mt-28">
      <!-- If tiers is empty, show a fallback message for debugging -->
      <div v-if="!tiers || tiers.length === 0" class="text-red-500">
        No subscriptions found or the array is empty. Check console logs.
      </div>

      <!-- Otherwise, loop over tiers -->
      <div
        v-else
        v-for="sub in tiers"
        :key="sub.id"
        class="p-6 rounded-lg shadow-md"
        :class="sub.name === 'Enterprise' ? 'bg-gray-800 text-white' : 'bg-white text-black'"
      >
        <h3 class="text-lg font-semibold text-kleur">
          {{ sub.name }}
        </h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatPrice(sub.price) }}
          <span class="text-base font-medium text-gray-500">/month</span>
        </p>
        <p class="mt-4 text-sm">
          {{ sub.description || 'No description provided.' }}
        </p>
        <ul class="mt-4 space-y-2 text-sm">
          <!-- Hardcode or handle dynamic features if your DB stores them -->
          <li
            v-for="feature in defaultFeatures[sub.name] || []"
            :key="feature"
            class="flex items-center"
          >
            <CheckIcon class="h-5 w-5 text-kleur mr-2" aria-hidden="true" />
            {{ feature }}
          </li>
        </ul>
        <button
          @click="showPopup(sub)"
          class="mt-6 w-full rounded-md bg-kleur px-4 py-2 text-sm font-medium text-white hover:bg-kleur2 focus:ring-2 focus:ring-offset-2 focus:ring-kleur"
        >
          Get started today
        </button>
      </div>
    </div>

    <!-- Subscription Section (Visible only when user is subscribed) -->
    <div
      v-if="isSubscribed"
      class="sub2 m-20 h-5/6 p-6 rounded-lg shadow-md bg-gradient-to-b from-kleur to-pink-500"
    >
      <p class="p-2 mt-4 font-bold text-center text-3xl">You Subscribed!</p>
      <hr />
      <!-- Show the subscribed plan name, price & period -->
      <div class="mt-4 text-white text-center">
        <p class="text-lg font-semibold">Plan: {{ activeSubscription.subscription?.name }}</p>
        <p class="text-sm mt-2">Price: ${{ activeSubscription.subscription?.price }}</p>
        <p class="text-sm">Period (days): {{ activeSubscription.subscription?.periode }}</p>
      </div>
      <ul class="mt-4 space-y-2 text-sm text-white h-80">
        <li
          v-for="feature in defaultFeatures[activeSubscription.subscription?.name] || []"
          :key="feature"
          class="flex items-center"
        >
          <CheckIcon class="h-5 w-5 text-kleur mr-2" aria-hidden="true" />
          {{ feature }}
        </li>
      </ul>
      <div class="row-start-6">
        <button
          @click="showCancelConfirmation"
          class="flex shadow-xl w-1/2 m-auto justify-center rounded-md bg-koranje px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur"
        >
          Stop subscription
        </button>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      v-if="showCancelConfirmationModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg p-8 w-96 text-center relative">
        <h2 class="text-xl font-bold text-gray-900">Are you sure you want to cancel your subscription?</h2>
        <p class="mt-4 text-gray-600">If you cancel, you will lose access to the features of your plan.</p>
        <div class="mt-6">
          <button
            @click="cancelSubscription"
            class="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700"
          >
            Yes, cancel
          </button>
          <button
            @click="closeCancelConfirmationModal"
            class="px-4 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-700 ml-4"
          >
            No, keep it
          </button>
        </div>
      </div>
    </div>

    <!-- Subscription Popup Modal -->
    <div
      v-if="selectedTier"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg p-8 w-96 text-center relative">
        <h2 class="text-xl font-bold text-gray-900">Subscribe to {{ selectedTier.name }}</h2>
        <p class="mt-4 text-gray-600">{{ selectedTier.description }}</p>
        <p class="mt-2 text-2xl font-semibold text-kleur">{{ formatPrice(selectedTier.price) }}/month</p>
        <button
          @click="subscribeToTier(selectedTier)"
          :disabled="isSubscribed"
          class="mt-6 px-4 py-2 rounded-md text-white shadow-xl"
          :class="isSubscribed ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'"
        >
          I want to Subscribe!
        </button><br>
        <button
          @click="closePopup"
          class="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import { CheckIcon } from '@heroicons/vue/solid'

const isSubscribed = ref(false)
const tiers = ref([])
const selectedTier = ref(null)
const showCancelConfirmationModal = ref(false)
const activeSubscription = ref(null)

const defaultFeatures = {
  Basic: ['Feature A', 'Feature B', 'Feature C'],
  Enterprise: ['Unlimited everything', 'Dedicated support', 'Advanced analytics'],
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  try {
    // 1) Fetch all available subscriptions from /api/subscription/all
    const allSubsResponse = await axios.get('http://127.0.0.1:8000/api/subscription/all', {
      headers: { Authorization: `Bearer ${token}` },
    })

    // allSubsResponse.data.subscription => check if it's an array
    if (allSubsResponse.data && Array.isArray(allSubsResponse.data.subscription)) {
      tiers.value = allSubsResponse.data.subscription
      console.log('Subscriptions array:', tiers.value)
    } else {
      console.error('API did not return subscription array as expected:', allSubsResponse.data)
    }

    // 2) Check if user is subscribed
    const subResponse = await axios.get('http://127.0.0.1:8000/api/subscription', {
      headers: { Authorization: `Bearer ${token}` },
    })
    // If success, user has an active subscription
    if (subResponse.data) {
      isSubscribed.value = true
      activeSubscription.value = subResponse.data
    }
  } catch (error) {
    // If 404 => no active subscription
    if (error.response?.status === 404) {
      isSubscribed.value = false
      console.log('No active subscription')
    } else {
      console.error(error)
    }
  }
})

function formatPrice(price) {
  return `$${price}`
}

function showPopup(subscription) {
  selectedTier.value = subscription
}

function closePopup() {
  selectedTier.value = null
}

async function subscribeToTier(tier) {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/subscribe',
      { subscription_id: tier.id, status: 'active' },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log('Subscription success response:', response.data)
    isSubscribed.value = true
    activeSubscription.value = response.data
    closePopup()
    alert('Subscription successful!')
  } catch (err) {
    console.error('Error subscribing:', err)
    alert('Failed to subscribe.')
  }
}

function showCancelConfirmation() {
  showCancelConfirmationModal.value = true
}

function closeCancelConfirmationModal() {
  showCancelConfirmationModal.value = false
}

async function cancelSubscription() {
  const token = localStorage.getItem('token')
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/subscription/disable',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    isSubscribed.value = false
    activeSubscription.value = null
    closeCancelConfirmationModal()
    alert('Subscription canceled successfully!')
  } catch (error) {
    console.error('Error canceling subscription:', error)
    alert('Failed to cancel subscription.')
  }
}
</script>

<style>
@media (max-width: 800px) {
  .sub {
    background-image: none;
    display: block;
    margin-left: 0;
    margin-top: 20px;
  }
  .sub2 {
    margin: 20px;
  }
}
</style>
