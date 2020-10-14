<template>
  <div class="center">
    <Nav class="" />
    <div class="flex center">
      <div class="md:w-1/3 w-full border">
        <!-- QR code generator -->
        <div class="p-8 m-auto">
          <h5 class="mb-2">Generate QR code for any link</h5>

          <label for="userLink" class="text-xs mb-1 float-left"
            >Enter link here</label
          >
          <input
            class="bg-teal-100 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="email"
            name="userLink"
            placeholder="url"
            v-model="user.enteredUrl"
          />
          <div v-if="isError" class="text-red-500 text-sm">
            url cannot be empty
          </div>

          <button
            class="bg-gray-100 mt-5 text-sm hover:bg-teal-500 text-teal-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-teal-500 rounded"
            @click="generateQrCode()"
          >
            <font-awesome-icon icon="cog" :class="spinnClass" />
            Generate
          </button>

          <div v-if="user.isQrCodeGenerated">
            <!-- <img src="../assets/banner.svg" /> -->
            <!-- <img src="./assets/logo.png"/> -->
            <!-- <img src="../assets/signup.svg" alt="" srcset="" /> -->
            <p class="text-sm">{{qrResponseData}}</p>
          </div>
          <br />
        </div>
      </div>

      <!-- paystack -->
      <div class="md:w-1/3 sm:w-full border">
        <div class="p-10 m-auto">
          <h5 class="mb-2">Test Paystack's payment</h5>
          <button
            class="bg-gray-100 hover:bg-teal-500 text-teal-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-teal-500 rounded"
            @click="callModal()"
          >
            <font-awesome-icon icon="credit-card" />
            Pay Online
          </button>
        </div>
      </div>

      <div class="md:w-1/3 border sm:w-full">
                <div class="p-8 m-auto space-x-4">
          <h5 class="mb-2">Check out GADS LEADERS 2020</h5>
          <button
            class="bg-gray-100 mb-4 hover:bg-teal-500 text-teal-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-teal-500 rounded"
            @click="navigate('leaders/learning')"
          >
            <font-awesome-icon icon="clock" />
            Learning Leaders
          </button>

          <button
            class="bg-gray-100 hover:bg-teal-500 text-teal-500 hover:text-white font-bold p-2 border hover:border-gray-100 border-teal-500 rounded"
            @click="navigate('leaders/skilled')"
          >
            <font-awesome-icon icon="brain" />
            Skilled Leaders
          </button>
        </div>
      </div>
    </div>

    <modal name="modal" width="350">
      <div class="p-8">
        <label>Enter your email to pay</label>
        <input
          class="bg-teal-100 mb-5 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="email"
          value="ik.ezugworie@gmail.com"
          v-model="customer.email"
        />

        <label>Amount to pay (₦)</label>
        <input
          class="bg-teal-200 mb-5 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="number"
          value="20"
          disabled
          v-model="customer.amount"
        />

        <button
          class="bg-gray-100 p-2 hover:bg-teal-500 text-teal-500 hover:text-white font-bold border hover:border-gray-100 border-gray-700 rounded"
          @click="payFee()"
        >
          <font-awesome-icon icon="credit-card" />
          Checkout Paystack
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav';
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      customer: {
        email: 'ik.ezugworie@gmail.com',
        amount: 20,
      },
      isEmailFilled: false,

      user: {
        enteredUrl: '',
        isQrCodeGenerated: false,
      },
      isLoading: false,
      isStyled: true,
      spinnClass: '',
      qrCodeApi: 'https://www.qrtag.net/api/qr_4.png?url=',
      isError: false,
      qrResponseData: null,
    };
  },
  components: {
    Nav,
  },
  methods: {
    callModal() {
      // this.$refs.modal.open();
      this.$modal.show('modal');
    },
    payFee() {
      console.log(this.customer.amount + ' || ' + this.customer.email);
      if (this.customer.email) {
        this.initializePaystack();
      }
    },
    initializePaystack() {
      const paystackInitializationApi =
        'https://api.paystack.co/transaction/initialize';
      const paystackUserToken =
        'sk_test_da2bb19ad0c9b8ab8510c1e51e6488520714b952';
      axios
        .post(
          paystackInitializationApi,
          {
            email: this.customer.email,
            amount: this.customer.amount,
          },
          {
            headers: {
              Authorization: 'Bearer ' + paystackUserToken,
            },
          }
        )
        .then((response) => {
          // paystackResponse.data = response.data.data;
          // console.log(paystackResponse.data.authorization_url);

          //navigate to paystack
          window.open(response.data.data.authorization_url, '_self');
        })
        .catch((error) => {
          console.log(error);
        });

      // this.$router.push({ path: this.paystackInitizeResponse.authorization_url})
    },

    generateQrCode() {
      let fullApi = this.qrCodeApi + this.user.enteredUrl;
      if (fullApi.endsWith('=')) {
        this.isError = true;
        console.log(fullApi);
      } else {
        this.btnVisibility = 'disabled';
        this.isError = false;
        this.spinnClass = 'fa-spin';
        axios
          .post(fullApi)
          .then((response) => {
            this.spinnClass = '';
            console.log(response.data);
            //  this.btnVisibility = ''
            this.user.enteredUrl = 'Hello';
            fullApi = '';
            this.user.isQrCodeGenerated = true
            this.qrResponseData = response.data
          })
          .catch((error) => {
            this.spinnClass = '';
            this.user.enteredUrl = '';
            this.isError = false;
            fullApi = '';

            console.log(error);
          });
      }
    },
    navigate(routeUrl) {
      this.$router.push(routeUrl)
    }
  },
  mounted() {
    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && !this.user.enteredUrl.value) {
        this.generateQrCode();
        console.log('ENTER BUTTON CLIKED');
      }
    });
  },
};
</script>
