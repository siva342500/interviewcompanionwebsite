<template>
  <div>
    <Header></Header>
    <div class="login-container">
      <h1>Login</h1>
      <div class="user-type-selection">
        <button
          :class="{ active: userType === 'student' }"
          @click="setUserType('student')"
        >
          Student
        </button>
        <button
          :class="{ active: userType === 'expert' }"
          @click="setUserType('expert')"
        >
          Expert
        </button>
      </div>

      <form @submit.prevent="login">
        <!-- Mobile number input -->
        <div class="form-group">
          <label for="phone">Mobile Number</label>
          <div class="phone-input-container">
            <input
              type="text"
              id="phone"
              v-model="form.phone"
              placeholder="Enter your mobile number"
              required
            />
            <button type="button" @click="sendOtp" class="btn-send-otp">
              Send OTP
            </button>
          </div>
        </div>

        <!-- OTP input will be shown only if OTP has been sent -->
        <div class="form-group" v-show="otpSent">
          <label for="otp">OTP</label>
          <input
            type="text"
            id="otp"
            v-model="form.otp"
            placeholder="Enter the OTP"
            required
          />
        </div>

        <!-- Login button will be enabled only after OTP is sent -->
        <button type="submit" class="btn-login" :disabled="!otpSent">
          Login
        </button>
      </form>

      <!-- Display error or success messages -->
      <p v-if="message" :class="messageTypeClass">{{ message }}</p>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/FooterPage.vue";
import Header from "@/components/HeaderPage.vue";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      userType: "student", // Default to student
      form: {
        phone: "",
        otp: "",
      },
      otpSent: false, // Initially OTP has not been sent
      message: "",
      messageType: "", // 'success' or 'error'
    };
  },
  computed: {
    messageTypeClass() {
      return this.messageType === "success"
        ? "success-message"
        : "error-message";
    },
  },
  methods: {
    setUserType(type) {
      this.userType = type;
      this.clearMessages();
      this.otpSent = false; // Reset OTP sent flag when changing user type
    },
    clearMessages() {
      this.message = "";
      this.messageType = "";
    },
    async sendOtp() {
      this.clearMessages();
      if (!this.form.phone) {
        this.message = "Please enter a valid mobile number.";
        this.messageType = "error";
        return;
      }
      try {
        const apiUrl =
          "https://interview-companion-440607.uc.r.appspot.com/api/send-otp";

        // Send OTP to mobile number for both student and expert
        const response = await axios.post(apiUrl, {
          mobileNumber: this.form.phone,
        });

        if (response.data) {
          this.otpSent = true;
          this.message = "OTP sent successfully!";
          this.messageType = "success";
        } else {
          this.message = response.data.message || "Failed to send OTP.";
          this.messageType = "error";
        }
      } catch (error) {
        this.message =
          error.response?.data?.message ||
          "An error occurred while sending OTP.";
        this.messageType = "error";
      }
    },
    async verifyOtp() {
      this.clearMessages(); // Clear previous messages
      try {
        const apiUrl =
          "https://interview-companion-440607.uc.r.appspot.com/api/verify-otp";

        // Retrieve the JWT token from localStorage (or Vuex if using it for state management)
        const token = localStorage.getItem("token"); // Assuming the token is stored as 'token'

        // Send OTP verification request with Authorization header
        const response = await axios.post(
          apiUrl,
          {
            mobileNumber: this.form.phone,
            otp: this.form.otp,
          },
          {
            headers: {
              "auth-token": `${token}`, // Add Bearer token for authorization
            },
          }
        );

        // Check the response status to determine success
        if (response.data && response.data) {
          this.message = "OTP verified successfully!";
          this.messageType = "success"; // Mark success message
          localStorage.setItem("token", response.data.token);
          // Proceed to check if the mobile number exists for student or expert
          if (this.userType === "student") {
            await this.checkStudentPhoneExistence(); // Check for student existence
          } else {
            await this.checkExpertPhoneExistence(); // Check for expert existence
          }
        } else {
          // If response does not indicate success
          this.message = response.data.message || "Failed to verify OTP.";
          this.messageType = "error";
        }
      } catch (error) {
        // Handle any errors that occur during the OTP verification process
        this.message =
          error.response?.data?.message ||
          "An error occurred while verifying OTP.";
        this.messageType = "error";
      }
    },

    // async verifyOtp() {
    //   this.clearMessages();
    //   try {
    //     const apiUrl = "`https://interview-companion-440607.uc.r.appspot.com/api/verify-otp";

    //     // Send OTP verification request
    //     const response = await axios.post(apiUrl, {
    //       mobileNumber: this.form.phone,
    //       otp: this.form.otp,
    //     });

    //     if (response.data) {
    //       this.message = "OTP verified successfully!";
    //       this.messageType = "success";
    //       // Proceed to check if the mobile number exists for student or expert
    //       if (this.userType === "student") {
    //         this.checkStudentPhoneExistence();
    //       } else {
    //         this.checkExpertPhoneExistence();
    //       }
    //     } else {
    //       this.message = response.data.message || "Failed to verify OTP.";
    //       this.messageType = "error";
    //     }
    //   } catch (error) {
    //     this.message =
    //       error.response?.data?.message || "An error occurred while verifying OTP.";
    //     this.messageType = "error";
    //   }
    // },

    async checkExpertPhoneExistence() {
      this.clearMessages();
      try {
        const expertApi = `https://interview-companion-440607.uc.r.appspot.com/api/experts/check-phone/${this.form.phone}`;

        const response = await axios.get(expertApi);

        if (response.data.exists) {
          this.message = "Expert profile found!";
          this.messageType = "success";

          localStorage.setItem("expertId", response.data.expertId);
          localStorage.setItem("userType", "expert");
          // Store the expert details in localStorage or Vuex (Optional)
          localStorage.setItem(
            "expertDetails",
            JSON.stringify(response.data.expertId)
          );
          console.log(
            "Navigating to ExpertProfilePage with ID:",
            response.data.expertId
          );

          // Redirect to the expert profile page with expertId
          this.$router.push({
            name: "ExpertHomePage",
            params: { expertId: response.data.expertId },
          });
        } else {
          this.message = "No expert profile found for this phone number.";
          this.messageType = "error";
        }
      } catch (error) {
        this.message =
          error.response?.data?.message ||
          "An error occurred while checking phone number.";
        this.messageType = "error";
      }
    },

    async checkStudentPhoneExistence() {
      this.clearMessages();
      try {
        const studentApi = `https://interview-companion-440607.uc.r.appspot.com/api/students/check-phone/${this.form.phone}`;

        const response = await axios.get(studentApi);

        if (response.data.exists) {
          this.message = "Student profile found!";
          this.messageType = "success";
          localStorage.setItem("studentId", response.data.studentId);
          localStorage.setItem("userType", "student");
          // Store the student details in localStorage or Vuex (Optional)
          localStorage.setItem(
            "studentDetails",
            JSON.stringify(response.data.studentId)
          );
          console.log(
            "Navigating to StudentProfilePage with ID:",
            response.data.studentId
          );

          // Redirect to the student profile page with studentId
          this.$router.push({
            name: "HomePage1",
            params: { studentId: response.data.studentId },
          });
        } else {
          this.message = "No student profile found for this phone number.";
          this.messageType = "error";
        }
      } catch (error) {
        this.message =
          error.response?.data?.message ||
          "An error occurred while checking phone number.";
        this.messageType = "error";
      }
    },

    async login() {
      if (this.otpSent) {
        try {
          // Call the verifyOtp function and await its response
          const response = await this.verifyOtp(); // Capture the response from verifyOtp

          if (response && response.data) {
            // Store user-specific data in localStorage
            if (this.userType === "student") {
              localStorage.setItem("studentId", response.data.studentId); // Store studentId
              localStorage.setItem("userType", "student"); // Store userType as "student"
            } else if (this.userType === "expert") {
              localStorage.setItem("expertId", response.data.expertId); // Store expertId
              localStorage.setItem("userType", "expert"); // Store userType as "expert"
            }

            // Optionally, you can set more user-related data
            localStorage.setItem("userType", this.userType); // Store userType in localStorage

            // Redirect the user to their profile based on userType
            if (this.userType === "student") {
              this.$router.push({
                name: "StudentProfilePage",
                params: { studentId: response.data.studentId },
              });
            } else if (this.userType === "expert") {
              this.$router.push({
                name: "ExpertProfilePage",
                params: { expertId: response.data.expertId },
              });
            }
            localStorage.setItem("userType", this.userType);
          } else {
            // If the response is incorrect, show error message
            this.message = "Failed to verify OTP.";
            this.messageType = "error";
          }
        } catch (error) {
          // Catch any errors that might occur during the API request
          console.error("Login error:", error);
          this.message =
            error.response?.data?.message ||
            "An error occurred while verifying OTP.";
          this.messageType = "error";
        }
      } else {
        // If OTP is not sent, show error message
        this.message = "Please send OTP first.";
        this.messageType = "error";
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-type-selection button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-type-selection button.active {
  background-color: #000000;
  color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.phone-input-container {
  display: flex;
  align-items: center;
}

.phone-input-container input {
  flex: 1;
}

.btn-send-otp {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>
