<template>
    <div class="wizard-form max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 class="text-center text-2xl font-bold text-koranje">Aanmelden bij SoulConnect</h1>
  
      <div class="step-indicators flex justify-between mt-4">
        <span
          v-for="(step, index) in steps"
          :key="index"
          :class="[ 'w-8 h-8 flex items-center justify-center rounded-full text-white', currentStep === index + 1 ? 'bg-koranje' : 'bg-gray-300' ]"
        >
          {{ index + 1 }}
        </span>
      </div>
  <!-- stap1 -->
      <form v-if="currentStep === 1" @submit.prevent="nextStep" class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800">Stap 1: Persoonlijke gegevens</h2>
        
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Nickname (Uniek):</label>
          <input
            type="text"
            v-model="form.nickname"
            placeholder="Bijv. LoveHunter123"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Geboortedatum:</label>
          <input
            type="date"
            v-model="form.birthdate"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
            @change="checkAge"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Geslacht:</label>
          <select
            v-model="form.gender"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          >
            <option value="male">Man</option>
            <option value="female">Vrouw</option>
            <option value="other">Anders</option>
          </select>
        </div>

        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Profielfoto:</label>
          <input type="file" @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
  
        <button
          type="submit"
          class="w-full mt-6 py-2 bg-koranje text-white font-bold rounded-lg hover:bg-doranje"
          :disabled="!isOver18"
        >
          Volgende
        </button>
      </form>
      
      <!-- stap 2 -->
      <form v-if="currentStep === 2" @submit.prevent="nextStep" class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800">Stap 2: Relatie en voorkeuren</h2>
    
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">One-liner over jezelf:</label>
          <textarea
            v-model="form.oneliner"
            placeholder="Vertel iets leuks over jezelf"
            required
            rows="3"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Wat waardeer je in een relatie?</label>
          <textarea
            v-model="form.valuedInRelationship"
            placeholder="Beschrijf wat je belangrijk vindt in een relatie"
            required
            rows="3"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Wat zoek je in een partner?</label>
          <textarea
            v-model="form.partnerSearch"
            placeholder="Beschrijf wat je zoekt in een partner"
            required
            rows="3"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Geslacht dat je zoekt:</label>
          <select
            v-model="form.preferredGender"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          >
            <option value="male">Man</option>
            <option value="female">Vrouw</option>
            <option value="other">Anders</option>
          </select>
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Relatie waar je voor openstaat:</label>
          <select
            v-model="form.relationshipType"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          >
            <option value="short">Korte relatie</option>
            <option value="long">Lange relatie</option>
          </select>
        </div>
  
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="previousStep"
            class="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600"
          >
            Terug
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-koranje text-white font-bold rounded-lg hover:bg-doranje"
          >
            Volgende
          </button>
        </div>
      </form>
  
      <!-- stap 3 -->
      <form v-if="currentStep === 3" @submit.prevent="nextStep" class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800">Stap 3: Accountinstellingen</h2>

        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Postcode:</label>
          <input
            type="text"
            v-model="form.postcode"
            placeholder="1234 AB"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Jouw email"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Wachtwoord:</label>
          <input
            type="password"
            v-model="form.password"
            minlength="16"
            placeholder="Minimaal 16 karakters"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
  
        <div class="mt-4">
          <label class="block text-gray-700 font-medium">Bevestig wachtwoord:</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            minlength="16"
            placeholder="Bevestig je wachtwoord"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
  
        <div class="mt-4">
          <label class="inline-flex items-center text-gray-700">
            <input
              type="checkbox"
              v-model="form.agreeToTerms"
              required
              class="form-checkbox text-koranje"
            />
            <span class="ml-2">Ik ga akkoord met de algemene voorwaarden</span>
          </label>
        </div>
  
        
  
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="previousStep"
            class="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600"
          >
            Terug
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-koranje text-white font-bold rounded-lg hover:bg-doranje"
            :disabled="!form.agreeToTerms"
          >
            Voltooi
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentStep: 1,
        steps: ["Persoonlijke gegevens", "Relatie en voorkeuren", "Accountinstellingen"],
        form: {
          nickname: "",
          oneliner: "",
          valuedInRelationship: "",
          partnerSearch: "",
          gender: "",
          preferredGender: "",
          relationshipType: "",
          email: "",
          password: "",
          confirmPassword: "",
          postcode: "",
          profilePicture: null,
          agreeToTerms: false,
          birthdate: "",
        },
        isOver18: false,
      };
    },
    methods: {
      nextStep() {
        if (this.currentStep < this.steps.length) {
          this.currentStep++;
        }
      },
      previousStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      submitForm() {
        alert("Aanmelding voltooid! 🎉");
        this.resetForm();
      },
      resetForm() {
        this.currentStep = 1;
        this.form = {
          nickname: "",
          oneliner: "",
          valuedInRelationship: "",
          partnerSearch: "",
          gender: "",
          preferredGender: "",
          relationshipType: "",
          email: "",
          password: "",
          confirmPassword: "",
          postcode: "",
          profilePicture: null,
          agreeToTerms: false,
          birthdate: "",
        };
        this.isOver18 = false;
      },
      handleFileUpload(event) {
        this.form.profilePicture = event.target.files[0];
      },
      checkAge() {
        const birthdate = new Date(this.form.birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        this.isOver18 = age >= 18;
      },
    },
  };
  </script>
  