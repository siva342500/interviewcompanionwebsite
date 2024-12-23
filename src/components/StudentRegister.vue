<template>
  <div>
    <!-- Header -->
    <Header />

    <div class="container mt-5">
      <h2 class="text-center mb-4">Student Registration</h2>
      <form @submit.prevent="registerStudent" class="shadow-lg p-4 rounded">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="name"
            v-model="student.name"
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
            v-model="student.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Mobile Number with Country Code -->
        <div class="mb-4">
          <label class="form-label">Phone Number</label>
          <div class="d-flex">
            <!-- Country Code -->
            <select
              v-model="student.countryCode"
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
              id="mobile"
              v-model="student.mobile"
              placeholder="Enter your mobile number"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-lg w-100 mt-4 bg-black"
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

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      student: {
        name: "",
        email: "",
        countryCode: "+91",
        mobile: "",
      },
    };
  },
  methods: {
    async registerStudent() {
      try {
        // Combine country code and mobile to form the phone number
        const phone = `${this.student.countryCode}${this.student.mobile}`;

        // Prepare the payload
        const payload = {
          name: this.student.name,
          email: this.student.email,
          phone: phone,
        };

        // API POST request
        const response = await axios.post(
          "https://interview-companion-440607.uc.r.appspot.com/api/students/create",
          payload
        );

        // Handle success
        if (response.data.status === "success") {
          alert("Registration Successful!"); // Show pop-up message

          // Clear form
          this.student = {
            name: "",
            email: "",
            countryCode: "+91",
            mobile: "",
          };

          // Navigate to login page
          this.$router.push("/login");
        } else {
          alert("Registration failed. Please try again."); // Handle unexpected errors
        }
      } catch (error) {
        // Handle error
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
      }
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
</style>
