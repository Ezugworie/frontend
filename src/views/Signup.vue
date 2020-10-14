<template>
  <div class="home items-center">
    <!-- <Nav class="mb-6" /> -->
    <div class="grid grid-cols-2 gap-5 w-auto mt-40">
      <div
        class="w-full max-w-xs items-center justify-center mx-40 -mt-20 self-center"
      >
        <form class="bg-white rounded pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="firstname"
            >
              Firstname
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              v-model="user.firstname"
              placeholder="Firstname"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="lastname"
            >
              Lastname
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              v-model="user.lastname"
              placeholder="Lastname"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              v-model="user.email"
              placeholder="Email"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="user.password"
              placeholder="******************"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              v-model="user.confirmPassword"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>
          <div class="flex items-center">
            <button
              class="bg-teal-500 w-full self-center hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="signup"
            >
              <svg
                v-if="loading"
                class="inline-block animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              ></svg>
              Sign up
            </button>
          </div>
          <div class="w-full text-gray-500 text-xs italic mt-2">
            Alredy registered?
            <span class="text-teal-500 hover:text-teal-700">
              <a href="/login">Sign in</a>
            </span>
          </div>
        </form>
      </div>
      <div class="col-span-1 align-middle items-center">
        <img src="../assets/bannaer.svg" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  components: {},

  data() {
    return {
      user: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      api: 'http://todoapp.pharmacopedia.store/api/register',
      loading: false,
    };
  },
  methods: {
    signup() {
      axios
        .post(this.api, {
          firstName: this.user.firstname,
          lastName: this.user.lastname,
          email: this.user.email,
          password: this.user.password,
        })
        .then((response) => {
          if (response.data.api_token) {
            localStorage.api_token = response.data.api_token;
            localStorage.email = response.data.email;
            localStorage.password = response.data.password;
            this.$router.push({ path: '/login' });
          }
        });
    },
  },
};
</script>
