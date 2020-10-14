<template>
  <div class="home items-center">
    <!-- <Nav class="mb-6" /> -->
    <div class="grid grid-cols-2 gap-5 w-auto mt-40">
      <div class="col-span-1 align-middle items-center">
        <img src="../assets/signup.svg" alt="" srcset="" />
      </div>
      <div class="w-full max-w-xs items-center justify-center mx-24 mt-8">
        <form class="bg-white rounded pt-6 pb-8 mb-4">
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
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="user.password"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>
          <div class="flex items-center justify-evenly">
            <button
              class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="login"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div class="w-full text-gray-500 text-xs italic mt-2">
            Don't have an account yet?
            <span class="text-teal-500 hover:text-teal-700">
              <a href="/signup">Sign up</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import Nav from '@/components/Nav';
import axios from 'axios';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      user: {
        email: null,
        password: null,
        api_token: null,
      },
      api: 'http://todoapp.pharmacopedia.store/api/login',
    };
  },
  methods: {
    initializeFields() {
      console.log(localStorage.response.user.email);
      (this.user.email = localStorage.email),
        (this.user.password = localStorage.password),
        (this.user.api_token = localStorage.api_token);
    },
    login() {
      axios
        .post(this.api, {
          email: this.user.email,
          password: this.user.password,
        })
        .then((response) => {
          if (response.data.api_token !== null) {
            this.$router.push({ path: '/' });
            console.log('SUCCESS');
          }
        });
    },
  },
  mounted() {
    this.initializeFields();
  },
};
</script>
