<template>
  <div>
    <!-- Header -->
    <Header />

    <div class="container mt-5">
      <h2 class="text-center mb-4">Expert Registration</h2>
      <form @submit.prevent="registerExpert" class="shadow-lg p-4 rounded">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="name"
            v-model="expert.name"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control form-control-lg"
            id="email"
            v-model="expert.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Phone Number with Country Code -->
        <div class="mb-4">
          <label class="form-label">Phone Number</label>
          <div class="d-flex">
            <!-- Country Code -->
            <select
              v-model="expert.countryCode"
              class="form-select form-select-lg w-auto me-2"
              required
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <!-- Add more country codes as needed -->
            </select>

            <!-- Mobile Number -->
            <input
              type="tel"
              class="form-control form-control-lg"
              id="phone"
              v-model="expert.phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <!-- Referral Code -->
        <div class="mb-4">
          <label for="referralCode" class="form-label">Referral Code</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="referralCode"
            v-model="expert.referral_code"
            placeholder="Enter referral code"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn bg-black btn-lg w-100 mt-4"
          style="color: white"
        >
          Register
        </button>
        <div class="text-center mt-3">
          <p>
            Already have an account?
            <router-link
              to="/login"
              class="text-decoration-underline"
              style="color: black; font-weight: bold"
            >
              Please login
            </router-link>
          </p>
        </div>
      </form>
    </div>

    <!-- Success Modal -->
    <div
      class="modal fade"
      id="successModal"
      tabindex="-1"
      aria-labelledby="successModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">
              Registration Successful
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            You have successfully registered as an expert. Please log in to
            continue.
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn bg-black"
              style="color: white"
              @click="navigateToLogin"
            >
              ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      expert: {
        name: "",
       email: this.$route.query.email || "",
        countryCode: "+91",
        phone: "",
        referral_code: "",
      },
      deviceDetails: {
        device_uuid: "1001e2c9-3948-4237-8d0c-efcd6658d721", // Example UUID
        platform: "web", // Platform information
        os_version: "Android 6.0", // OS version
      },
    };
  },
  methods: {
    async registerExpert() {
      try {
        // Combine country code and phone number
        const fullPhone = `${this.expert.countryCode}${this.expert.phone}`;

        // Prepare the payload
        const payload = {
          name: this.expert.name,
          email: this.expert.email,
          phone: fullPhone,
          referral_code: this.expert.referral_code,
          ...this.deviceDetails, // Spread operator to include device details
        };

        // API POST request
        const response = await axios.post(
          "https://api.interview-companion.com/api/experts",
          payload
        );

        // Handle success
        if (
          response.data.message === "Expert and device registered successfully"
        ) {
          // Show the success modal
          const modal = new bootstrap.Modal(
            document.getElementById("successModal")
          );
          modal.show();
        } else {
          throw new Error("Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again."); // Handle errors
      }
    },
    navigateToLogin() {
      // Navigate to the login page
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

/* Add shadow and padding to the form */
form {
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
}

/* Form label styling */
.form-label {
  font-weight: bold;
  font-size: 1rem;
}

/* Add space between form elements */
.mb-4 {
  margin-bottom: 1.5rem;
}

/* Large button for better visibility */
button {
  margin-top: 20px;
}

/* Styling for footer margin */
footer {
  margin-top: 50px;
}

/* Align phone number and country code */
.d-flex {
  display: flex;
  align-items: center;
}

.w-auto {
  width: auto;
  margin-right: 10px;
}
</style>
