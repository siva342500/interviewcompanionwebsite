<template>
  <div>
    <Header></Header>
    <div class="download-page">
      <!-- Left Side: App Image -->
      <div class="image-section">
        <img src="../../public/iphone1.png" alt="IOS App" class="app-image" />
      </div>

      <!-- Right Side: Text and Send Link -->
      <div class="content-section">
        <h1>Download Our IOS App</h1>
        <p>
          Stay connected with Interview Companion wherever you are. Download our
          IOS app to access all features, including interview support, training,
          and more, at your fingertips.
        </p>
        <ul>
          <li>Easy to use and navigate.</li>
          <li>Real-time notifications.</li>
          <li>Seamless payment integration.</li>
          <li>24/7 support at your convenience.</li>
        </ul>
        <h3>Send Download Link to Your Phone</h3>
        <form @submit.prevent="sendLink">
          <div class="input-group">
            <select v-model="countryCode" class="form-control country-code">
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <input
              type="text"
              v-model="phoneNumber"
              placeholder="Enter your phone number"
              class="form-control"
              required
            />
          </div>
          <button class="btn btn-primary mt-3" type="submit">Send Link</button>
        </form>
        <p v-if="linkSent" class="text-success mt-2">
          Download link has been sent to {{ fullPhoneNumber }}!
        </p>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";
import axios from "axios"; // Ensure axios is imported

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      phoneNumber: "",
      countryCode: "+1", // Default country code
      linkSent: false,
    };
  },
  computed: {
    fullPhoneNumber() {
      return `${this.countryCode}${this.phoneNumber}`;
    },
  },
  methods: {
    async sendLink() {
      if (this.phoneNumber) {
        try {
          // Prepare the data to send via the API
          const data = {
            phone: this.fullPhoneNumber,
          };

          // Make the API call to send the link
          const response = await axios.post(
            "http://localhost:8000/api/send-link-ios",
            data
          );

          // Assuming the response is successful, update the UI
          if (response.data.message === "Download link sent successfully.") {
            this.linkSent = true;

            // Refresh the page after success (2 seconds delay for user to see the success message)
            setTimeout(() => {
              window.location.reload(); // Refresh the page
            }, 2000);
          }
        } catch (error) {
          console.error("Failed to send link:", error);
          alert("Failed to send the download link. Please try again later.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Page Layout */
.download-page {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.image-section {
  flex: 1;
  max-width: 400px;
  text-align: center;
  padding: 20px;
}

.app-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-section {
  flex: 1;
  padding: 20px;
  max-width: 500px;
}

.content-section h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.content-section p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1.6;
}

.content-section ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.content-section ul li {
  font-size: 1rem;
  margin-bottom: 8px;
}

/* Input Form */
.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.input-group .country-code {
  max-width: 120px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-group .form-control {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #131415;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #616263;
}

/* Success Message */
.text-success {
  color: green;
  font-size: 1rem;
  margin-top: 10px;
}
</style>
