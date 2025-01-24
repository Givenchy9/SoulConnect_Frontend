<template>
  <div>
    <!-- Pricing Section -->
    <div class="relative isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
      <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
        <div class="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-Kleur">Pricing</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Choose the
          right plan for you</p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        text...
      </p>
      <div
        class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-2 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div v-for="(tier, tierIdx) in tiers" :key="tier.id"
          :class="[tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0', tier.featured ? '' : tierIdx === 0 ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl' : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none', 'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10']">
          <h3 :id="tier.id" :class="[tier.featured ? 'text-kleur' : 'text-kleur', 'text-base/7 font-semibold']">{{
            tier.name }}</h3>
          <p class="mt-4 flex items-baseline gap-x-2">
            <span :class="[tier.featured ? 'text-white' : 'text-gray-900', 'text-5xl font-semibold tracking-tight']">{{
              tier.priceMonthly }}</span>
            <span :class="[tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base']">/month</span>
          </p>
          <p :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7']">{{
            tier.description
          }}</p>
          <ul role="list"
            :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-8 space-y-3 text-sm/6 sm:mt-10']">
            <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
              <CheckIcon :class="[tier.featured ? 'text-kleur' : 'text-kleur', 'h-6 w-5 flex-none']"
                aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>
          <button @click="showPopup(tier)"
            class="flex shadow-xl w-full justify-center rounded-md bg-kleur px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Get
            started today</button>
        </div>
      </div>
    </div>

    <!-- Subscription Section -->
    <div class="box grid grid-rows-6 bg-kleur h-screen rounded-3xl">
      <p class="p-2 mt-4 font-bold text-center text-3xl">You Subscribed!</p>
      <ul class="px-20">
        <li>Offers</li>
        <li>Options</li>
        <li>...</li>
      </ul>
      <div class="row-start-6">
        <a
          class="flex shadow-xl w-1/2 m-auto justify-center rounded-md bg-kleur px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">Stop
          subscription</a>
      </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="selectedTier" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-8 w-96 text-center relative">
        <h2 class="text-xl font-bold text-gray-900">Subscribe to {{ selectedTier.name }}</h2>
        <p class="mt-4 text-gray-600">{{ selectedTier.description }}</p>
        <p class="mt-2 text-2xl font-semibold text-kleur">{{ selectedTier.priceMonthly }}/month</p>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer">
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
            <p class="m-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</p>
          </div>
        </label><br>
        <button @click="closePopup"
          class="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { CheckIcon } from '@heroicons/vue/20/solid'

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
];

// Reactive data for managing the popup state
import { ref } from 'vue';
const selectedTier = ref(null);

function showPopup(tier) {
  selectedTier.value = tier;
}

function closePopup() {
  selectedTier.value = null;
}
</script>

<style>
@media (max-width: 800px) {
  .box {
    height: 80vh;
    width: 100%;
    padding-left: 20%;
  }
}
</style>
