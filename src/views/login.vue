<template>
  <div class="box flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="backdrop-blur-3xl shadow-xl bg-transparent-10 p-4 rounded-xl mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in
        </h2>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <p v-if="error" class="mt-10 bg-red-400 rounded-sm text-center text-lg text-white">
          {{ error }}
        </p>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              required
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <button type="submit"
            class="flex shadow-xl w-full justify-center rounded-md bg-kleur px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-kleur2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleur">
            <div v-if="!loading" class="text-white">Login</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
            </div>
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-white">
        Geen account?
        {{ ' ' }}
        <RouterLink to="/register" class="font-semibold leading-6 text-kleur hover:text-kleur2">Maak hier
          een account</RouterLink>
      </p>
    </div>
  </div>
</template>

<style>
body {
  background-image: url("https://smarative.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1511634829096-045a111727eb%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DMnwxMTc3M3wwfDF8c2VhcmNofDd8fGZyb3N0ZWQlMjBnbGFzc3xlbnwwfHx8fDE2MzMzNTc0MTU%26ixlib%3Drb-1.2.1%26q%3D80%26w%3D2000&w=3840&q=75");
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 800px) {
  body {
    background-image: url("https://smarative.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1511634829096-045a111727eb%3Fcrop%3Dentropy%26cs%3Dtinysrgb%26fit%3Dmax%26fm%3Djpg%26ixid%3DMnwxMTc3M3wwfDF8c2VhcmNofDd8fGZyb3N0ZWQlMjBnbGFzc3xlbnwwfHx8fDE2MzMzNTc0MTU%26ixlib%3Drb-1.2.1%26q%3D80%26w%3D2000&w=3840&q=75");
    background-repeat: no-repeat;
    background-size: 1510px;
  }

  .box {
    padding-top: 120px;
  }
}
</style>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = null;
      try {
        // Make the API request
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Log the response for debugging purposes
        console.log('API Response:', response.data);

        // Extract the response data
        const data = response.data;

        // Check for a successful response
        if (data && data.token && data.user) {
          // Store the token and user data in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('tokenTime', new Date().toISOString());

          // Redirect to another page, e.g., films page
          this.$router.push('/films');
        } else {
          // Handle unexpected responses
          this.error = 'Unexpected response format. Please try again.';
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        // Handle errors during the API request
        this.loading = false;

        if (error.response && error.response.data) {
          // Server responded with an error (4xx or 5xx)
          console.error('Error response:', error.response.data);
          this.error = error.response.data.message || 'Login failed. Please check your credentials.';
        } else {
          // No response from the server or a network error
          console.error('Network error:', error);
          this.error = 'Network error. Please try again later.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
