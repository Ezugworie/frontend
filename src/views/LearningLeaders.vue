<template>
  <div class="container">
    <div class="bg-blue-300">
      <button
        class="bg-gray-100 m-6 hover:bg-blue-500 text-blue-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-blue-500 rounded"
        @click="goHome()"
      >
        <font-awesome-icon icon="home" />
        Back to Home
      </button>
      <button
        class="bg-gray-100 m-6 hover:bg-blue-500 text-blue-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-blue-500 rounded"
        @click="otherLeaders()"
      >
        <font-awesome-icon icon="brain" />
        Skilled Leaders
      </button>

      <div class="h-full p-6">
        <ul class="">
          <li
            v-for="leader in learningLeaderResponse"
            :key="leader.id"
            class="inline-block"
          >
            <div
              class="max-w-sm rounded overflow-hidden bg-white m-4 shadow-lg"
            >
              <img
                class="w-1/3 inline ml-3 self-center"
                :src="leader.badgeUrl"
                alt="Leader badge"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-lg mb-1">{{ leader.name }}</div>
                <div class="text-md mb-1">{{ leader.country }}</div>
                <div class="text-md mb-1">{{ leader.hours }} hours</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import learningLeader from '@/models/learningLeader';

export default {
  data() {
    return {
      learningLeaderResponse: [],
    };
  },
  methods: {
    getLeadersApi() {
      //
      let storedValue = localStorage.getItem('learningLeaders');
      let me = 1;
      if (me == 2) {
        this.learningLeaderResponse = storedValue;
      } else {
        axios
          .get('https://gadsapi.herokuapp.com/api/hours')
          .then((response) => {
            console.log(response.data);
            this.learningLeaderResponse = response.data;
            localStorage.setItem('learningLeaders', response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    goHome() {
      this.$router.push('/');
    },
    otherLeaders() {
      this.$router.push('/leaders/skilled');
    },
  },
  mounted() {
    this.getLeadersApi();
  },
};
</script>

<style></style>
