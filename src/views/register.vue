<template>
  <div class="wizard-form max-w-2xl mx-auto backdrop-blur shadow-lg rounded-lg p-6 mt-10 text-white">
    <h1 class="text-center text-2xl font-bold mb-4">Aanmelden bij SoulConnect</h1>

    <div class="step-indicators flex justify-between mt-4">
      <span v-for="(step, index) in steps" :key="index" :class="[
        'w-8 h-8 flex items-center justify-center rounded-full text-white',
        currentStep === index + 1 ? 'bg-koranje' : 'bg-gray-300'
      ]">
        {{ index + 1 }}
      </span>
    </div>

    <!-- Stap 1 -->
    <form v-if="currentStep === 1" @submit.prevent="nextStep" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Stap 1: Persoonlijke gegevens</h2>

      <div class="mt-4">
        <label class="block font-medium">Nickname (Uniek):</label>
        <input type="text" v-model="form.nickname" placeholder="Bijv. LoveHunter123" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Geboortedatum:</label>
        <input type="date" v-model="form.birthdate" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black"
          @change="checkAge" />
        <div v-if="ageError" class="text-red-500 text-sm mt-1">{{ ageError }}</div>
      </div>

      <div class="mt-4">
        <label class="block font-medium">Geslacht:</label>
        <select v-model="form.gender" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black">
          <option value="Man">Man</option>
          <option value="Vrouw">Vrouw</option>
        </select>
      </div>

      <div class="mt-4">
        <label class="block font-medium">Profielfoto:</label>
        <input type="file" @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded-lg text-white" />
      </div>

      <button type="submit" class="w-full mt-6 py-2 bg-koranje font-bold rounded-lg hover:bg-doranje">
        Volgende
      </button>
      <p class="mt-10 text-center text-sm text-white">
        Heb je al een account?
        {{ ' ' }}
        <RouterLink to="/login" class="font-semibold leading-6 text-kleur hover:text-kleur2">Log hier in
        </RouterLink>
      </p>
    </form>

    <!-- Stap 2 -->
    <form v-if="currentStep === 2" @submit.prevent="nextStep" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Stap 2: Relatie en voorkeuren</h2>

      <div class="mt-4">
        <label class="block font-medium">One-liner over jezelf:</label>
        <textarea v-model="form.oneliner" placeholder="Vertel iets leuks over jezelf" required rows="3"
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Wat waardeer je in een relatie?</label>
        <textarea v-model="form.valuedInRelationship" placeholder="Beschrijf wat je belangrijk vindt in een relatie"
          required rows="3"
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Wat zoek je in een partner?</label>
        <textarea v-model="form.partnerSearch" placeholder="Beschrijf wat je zoekt in een partner" required rows="3"
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Geslacht dat je zoekt:</label>
        <select v-model="form.preferredGender" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black">
          <option value="Man">Man</option>
          <option value="Famle">Vrouw</option>
        </select>
      </div>

      <div class="mt-4">
        <label class="block font-medium">Relatie waar je voor openstaat:</label>
        <select v-model="form.relationshipType" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black">
          <option value="Casual">Casual</option>
          <option value="Serious">Serious</option>
        </select>
      </div>

      <div class="flex justify-between mt-6">
        <button type="button" @click="previousStep"
          class="px-6 py-2 bg-gray-500 font-bold rounded-lg hover:bg-gray-600">
          Terug
        </button>
        <button type="submit" class="px-6 py-2 bg-koranje font-bold rounded-lg hover:bg-doranje">
          Volgende
        </button>
      </div>
    </form>

    <!-- Stap 3 -->
    <form v-if="currentStep === 3" @submit.prevent="nextStep" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Stap 3: Accountinstellingen</h2>

      <div class="mt-4">
        <label class="block font-medium">Postcode:</label>
        <input type="text" v-model="form.postcode" placeholder="1234 AB" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Email:</label>
        <input type="email" v-model="form.email" placeholder="Jouw email" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-doranje text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Wachtwoord:</label>
        <input type="password" v-model="form.password" minlength="16" placeholder="Minimaal 16 karakters" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black" />
      </div>

      <div class="mt-4">
        <label class="block font-medium">Bevestig wachtwoord:</label>
        <input type="password" v-model="form.confirmPassword" minlength="16" placeholder="Bevestig je wachtwoord"
          required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black" />
      </div>

      <div class="mt-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="form.agreeToTerms" class="form-checkbox text-koranje" />
          <span class="ml-2">Ik ga akkoord met de algemene voorwaarden</span>
        </label>
        <div v-if="termsError" class="text-red-500 text-sm mt-1">{{ termsError }}</div>
      </div>

      <div class="flex justify-between mt-6">
        <button type="button" @click="previousStep"
          class="px-6 py-2 bg-gray-500 font-bold rounded-lg hover:bg-gray-600">
          Terug
        </button>
        <button type="submit" class="px-6 py-2 bg-koranje font-bold rounded-lg hover:bg-doranje">
          Volgende
        </button>
      </div>
    </form>

    <form v-if="currentStep === 4" @submit.prevent="submitForm" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Stap 4: Interesses</h2>

      <!-- Sectie: Mijn interesses -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold">Mijn interesses</h3>
        <p class="text-sm text-gray-300 mb-4">Selecteer de interesses die bij jou passen.</p>

        <div v-if="interests.length > 0" class="flex flex-wrap gap-2">
          <label
            v-for="interest in interests"
            :key="interest.id"
            class="flex items-center px-2 py-1 rounded-full border cursor-pointer transition-all text-sm select-none"
            :class="{
              'border-red-500 text-white': form.myInterests.includes(interest.id),
              'border-gray-400 text-gray-300': !form.myInterests.includes(interest.id),
            }"
            style="max-width: fit-content;"
          >
            <input
              type="checkbox"
              :value="interest.id"
              v-model="form.myInterests"
              class="hidden"
            />
            <span class="text-lg">{{ interest.name }}</span>

          </label>
        </div>

        <div v-else>
          <p class="text-gray-400">Geen interesses gevonden.</p>
        </div>
      </div>

      <!-- Sectie: Gezochte interesses -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold">Interesses die ik zoek in een partner</h3>
        <p class="text-sm text-gray-300 mb-4">Selecteer de interesses die je waardeert in een partner.</p>

        <div v-if="interests.length > 0" class="flex flex-wrap gap-2">
          <label
            v-for="interest in interests"
            :key="interest.id"
            class="flex items-center px-2 py-1 rounded-full border cursor-pointer transition-all text-sm select-none"
            :class="{
              'border-red-500 text-white': form.partnerInterests.includes(interest.id),
              'border-gray-400 text-gray-300': !form.partnerInterests.includes(interest.id),
            }"
            style="max-width: fit-content;"
          >
            <input
              type="checkbox"
              :value="interest.id"
              v-model="form.partnerInterests"
              class="hidden"
            />
            <span class="text-lg">{{ interest.name }}</span>
          </label>
        </div>

        <div v-else>
          <p class="text-gray-400">Geen interesses gevonden.</p>
        </div>
      </div>





      <!-- Knoppen -->
      <div class="flex justify-between">
        <button type="button" @click="previousStep" class="px-6 py-2 bg-gray-500 font-bold rounded-lg hover:bg-gray-600">
          Terug
        </button>
        <button type="submit" class="px-6 py-2 bg-koranje font-bold rounded-lg hover:bg-doranje">
          Voltooi
        </button>
      </div>
  </form>


  </div>
</template>

<style>
body {
  background-image: url("https://smarative.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1511634829096-045a111727eb%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DMnwxMTc3M3wwfDF8c2VhcmNofDd8fGZyb3N0ZWQlMjBnbGFzc3xlbnwwfHx8fDE2MzMzNTc0MTU%26ixlib%3Drb-1.2.1%26q%3D80%26w%3D2000&w=3840&q=75");
  background-repeat: no-repeat;
}

.flex.items-center {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

label {
  cursor: pointer;
}

input[type="checkbox"].hidden {
  display: none;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

</style>

<script>
import { RouterLink, useRouter } from 'vue-router';

export default {
  data() {
    return {
      currentStep: 1,
      steps: ["Persoonlijke gegevens", "Relatie en voorkeuren", "Accountinstellingen", "Interesses"],
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
        myInterests: [], // Interesses van de gebruiker
        partnerInterests: [], // Interesses die de gebruiker zoekt in een partner
      },
      interests: [], // Lijst met interesses van de backend
      isOver18: false,
      ageError: null,
      termsError: null,
    };
  },
  methods: {
    async fetchInterests() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/interests");
        const data = await response.json();
        this.interests = data;
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    },
    nextStep() {
      this.ageError = null;
      this.termsError = null;

      if (this.currentStep === 1 && !this.isOver18) {
        this.ageError = "Je moet 18 jaar of ouder zijn om door te gaan.";
        return;
      }

      if (this.currentStep === 3 && !this.form.agreeToTerms) {
        this.termsError = "Je moet akkoord gaan met de algemene voorwaarden!";
        return;
      }

      if (this.currentStep === 4) {
        this.submitForm();
        return;
      }

      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    async submitForm() {
  try {
    const formData = new FormData();

    // Map form fields to backend parameter names
    formData.append("email", this.form.email);
    formData.append("password", this.form.password);
    formData.append("nickname", this.form.nickname);
    formData.append("gender", this.form.gender);
    formData.append("birthdate", this.form.birthdate);
    formData.append("profile_image", this.form.profilePicture);
    formData.append("postcode", this.form.postcode);
    formData.append("relationship_type", this.form.relationshipType);
    formData.append("oneliner", this.form.oneliner);
    formData.append("profile_text", this.form.valuedInRelationship);

    // Append hobbies (myInterests)
    this.form.myInterests.forEach((interestId) => {
      formData.append("hobbies[]", interestId);
    });

    // Append looking_for_interests (partnerInterests)
    this.form.partnerInterests.forEach((interestId) => {
      formData.append("looking_for_interests[]", interestId);
    });

    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error submitting form:", errorData);
      alert("Er is een fout opgetreden. Controleer je gegevens en probeer opnieuw.");
      return;
    }

    const result = await response.json();
    console.log("Registration successful:", result);

    // Save user ID to localStorage for future use
    const userId = result.userId;
    localStorage.setItem("registeredUserId", userId);

    // Redirect to the email verification page
    this.$router.push("/verify-email");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
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
        myInterests: [],
        partnerInterests: [],
      };
      this.isOver18 = false;
      this.ageError = null;
      this.termsError = null;
    },
    handleFileUpload(event) {
      this.form.profilePicture = event.target.files[0];
    },
    checkAge() {
      const birthdate = new Date(this.form.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      this.isOver18 = age >= 18;
    },
  },
  async mounted() {
    await this.fetchInterests();
  },
};


</script>