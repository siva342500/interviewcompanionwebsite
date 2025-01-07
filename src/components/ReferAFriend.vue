<template>
  <AppHeader></AppHeader>
  <div class="refer-a-friend">
    <h2>Refer a Friend</h2>
    <form @submit.prevent="submitReferralForm">
      <!-- Country Code Select -->
      <div class="form-group">
        <label for="countryCode">Country Code</label>
        <select v-model="countryCode" required>
          <option value="">Select Country Code</option>
          <option value="+1">+1 (USA)</option>
          <option value="+91">+91 (India)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+61">+61 (Australia)</option>
          <option value="+81">+81 (Japan)</option>
          <!-- Add more country codes here -->
        </select>
      </div>

      <!-- Mobile Number -->
      <div class="form-group">
        <label for="phoneNumber">Mobile Number</label>
        <input
          type="text"
          id="phoneNumber"
          v-model="phoneNumber"
          placeholder="Enter mobile number"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"; // Import axios directly
import Swal from "sweetalert2"; // Import SweetAlert2 for better alerts
import AppHeader from "./AppHeader.vue";
export default {  
  name: "ReferAFriend",
   components: {
    AppHeader,
  },
  data() {
    return {
      countryCode: "", // Store the selected country code
      phoneNumber: "", // Store the mobile number
      studentId: this.$route.params.studentId, // Get the student ID from the URL params
    };
  },
  methods: {
    async submitReferralForm() {
      const fullPhoneNumber = `${this.countryCode}${this.phoneNumber}`;

      try {
        // Use the imported axios directly
        const response = await axios.post(
          "https://api.interview-companion.com/api/referrals",
          {
            student_id: this.studentId,
            referred_phone: fullPhoneNumber,
          }
        );

        // Handling the response from the API
        if (response.data.success) {
          // Show success popup
          Swal.fire({
            icon: "success",
            title: "Referral Sent",
            text: "Your referral was sent successfully!",
          });

          // Reset form fields
          this.countryCode = "";
          this.phoneNumber = "";
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Failed to refer a friend. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error submitting referral:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error submitting your referral. Please try again.",
        });
      }
    },
  },
};
</script>

<style scoped>
.refer-a-friend {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  color: #333;
}

select,
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.submit-button:hover {
  background-color: #333;
}
</style>
