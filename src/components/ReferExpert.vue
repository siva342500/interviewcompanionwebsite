<template>
  <div class="refer-expert-container">
    <h2>Refer an Expert</h2>

    <!-- Form for selecting country code and mobile number -->
    <form @submit.prevent="referExpert">
      <div class="form-group">
        <label for="countryCode">Country Code</label>
        <select v-model="countryCode" id="countryCode" required>
          <option value="+1">+1 (USA)</option>
          <option value="+91">+91 (India)</option>
          <option value="+44">+44 (UK)</option>
          <!-- Add more country codes as needed -->
        </select>
      </div>

      <div class="form-group">
        <label for="mobileNumber">Mobile Number</label>
        <input
          type="text"
          id="mobileNumber"
          v-model="mobileNumber"
          placeholder="Enter mobile number"
          required
        />
      </div>

      <button type="submit" class="submit-button">Refer Expert</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReferExpert",
  data() {
    return {
      countryCode: "+91", // Default country code (India)
      mobileNumber: "", // User input for mobile number
      expertId: localStorage.getItem("expertId"), // Getting expertId from localStorage
      token: localStorage.getItem("token"), // Getting auth token from localStorage
    };
  },
  methods: {
    async referExpert() {
      if (!this.mobileNumber) {
        alert("Please enter a mobile number");
        return;
      }

      const referredPhone = `${this.countryCode}${this.mobileNumber}`;
      const payload = {
        referred_phone: referredPhone,
        expert_id: this.expertId,
      };

      try {
        const response = await fetch(
          "https://api.interview-companion.com/api/expert/referral",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.token, // Pass the auth token here
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Referral successful!");
          this.resetForm();
        } else {
          alert(`Error: ${data.message || "Something went wrong"}`);
        }
      } catch (error) {
        console.error("Error referring expert:", error);
        alert("An error occurred. Please try again.");
      }
    },

    resetForm() {
      // Reset the form fields
      this.mobileNumber = "";
    },
  },
};
</script>

<style scoped>
.refer-expert-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

select,
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #0c0d0c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button.submit-button:hover {
  background-color: #737473;
}
</style>
