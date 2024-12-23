<template>
  <div class="app-container">
    <!-- Main Content -->
    <main class="main-content">
      <section
        v-if="
          !showPersonalDetails &&
          !showBankAccountDetails &&
          !showReferExpert &&
          !showEnrollHistory &&
          !showContactUs &&
          !showTermsCondition
        "
        class="account-section"
      >
        <h1 class="section-title">Expert Account</h1>

        <!-- Buttons in a card structure -->
        <div class="button-card">
          <button class="action-button" @click="showSection('personalDetails')">
            Personal Details
          </button>
          <button class="action-button" @click="showSection('bankAccount')">
            Bank Account Details
          </button>
          <button class="action-button" @click="showSection('referExpert')">
            Refer an Expert
          </button>
          <button class="action-button" @click="showSection('enrollHistory')">
            Enroll History
          </button>
          <button class="action-button" @click="showSection('contactUs')">
            Contact Us
          </button>
          <a class="terms" @click="showSection('termsCondition')"
            >Terms and Conditions</a
          >
        </div>
        <div class="footer-section">
          <button class="footer-button logout full-width">Logout</button>
        </div>
      </section>

      <!-- Expert Personal Details Component -->
      <section v-if="showPersonalDetails" class="details-section">
        <ExpertPersonalDetails
          @closeDetails="closeSection('personalDetails')"
        />
      </section>

      <!-- Bank Account Details Component -->
      <section v-if="showBankAccountDetails" class="details-section">
        <ExpertBankAccountDetails @closeDetails="closeSection('bankAccount')" />
      </section>

      <!-- Refer an Expert Component -->
      <section v-if="showReferExpert" class="details-section">
        <ReferExpert @closeDetails="closeSection('referExpert')" />
      </section>

      <!-- Enroll History Component -->
      <section v-if="showEnrollHistory" class="details-section">
        <EnrollHistory @closeDetails="closeSection('enrollHistory')" />
      </section>

      <!-- Contact Us Component -->
      <section v-if="showContactUs" class="details-section">
        <ExpertContactUs @closeDetails="closeSection('contactUs')" />
      </section>

      <!-- Terms and Conditions Component -->
      <section v-if="showTermsCondition" class="details-section">
        <div class="terms-content">
          <h2>Terms and Conditions</h2>
          <p>Detailed information about terms and conditions goes here...</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// Import components for Expert Account
import ExpertPersonalDetails from "@/components/ExpertPersonalDetails.vue";
import ExpertBankAccountDetails from "@/components/ExpertBankAccount.vue";
import ReferExpert from "@/components/ReferExpert.vue";
import EnrollHistory from "@/components/EnrollHistory.vue";
import ExpertContactUs from "@/components/ExpertContactUs.vue";

export default {
  name: "ExpertAccountPage",
  components: {
    ExpertPersonalDetails,
    ExpertBankAccountDetails,
    ReferExpert,
    EnrollHistory,
    ExpertContactUs,
  },
  data() {
    return {
      showPersonalDetails: false,
      showBankAccountDetails: false,
      showReferExpert: false,
      showEnrollHistory: false,
      showContactUs: false,
      showTermsCondition: false,
    };
  },
  methods: {
    showSection(section) {
      // Reset all sections visibility
      this.showPersonalDetails = false;
      this.showBankAccountDetails = false;
      this.showReferExpert = false;
      this.showEnrollHistory = false;
      this.showContactUs = false;
      this.showTermsCondition = false;

      // Enable the selected section
      if (section === "personalDetails") {
        this.showPersonalDetails = true;
      } else if (section === "bankAccount") {
        this.showBankAccountDetails = true;
      } else if (section === "referExpert") {
        this.showReferExpert = true;
      } else if (section === "enrollHistory") {
        this.showEnrollHistory = true;
      } else if (section === "contactUs") {
        this.showContactUs = true;
      } else if (section === "termsCondition") {
        this.showTermsCondition = true;
      }
    },
    closeSection(section) {
      if (section === "personalDetails") {
        this.showPersonalDetails = false;
      } else if (section === "bankAccount") {
        this.showBankAccountDetails = false;
      } else if (section === "referExpert") {
        this.showReferExpert = false;
      } else if (section === "enrollHistory") {
        this.showEnrollHistory = false;
      } else if (section === "contactUs") {
        this.showContactUs = false;
      } else if (section === "termsCondition") {
        this.showTermsCondition = false;
      }
    },
  },
};
</script>

<style scoped>
/* App Container */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
}

/* Account Section Styling */
.account-section {
  width: 100%;
  margin: 0;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

/* Button Container */
.button-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-button {
  background-color: #c6c7c6;
  color: #070606;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #efefef;
}
.footer-section {
  margin-top: 20px;
  width: 100%;
}

.footer-button.logout {
  background-color: #141312;
  color: #ffffff;
  padding: 15px; /* Add padding to make it similar to action buttons */
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.footer-button.logout:hover {
  background-color: #080808;
}

.footer-button.logout.full-width {
  width: 100%; /* Make the logout button span the full width */
}

/* Terms Link Styling */
.terms {
  text-align: center;
  color: black;
  cursor: pointer;
}

/* Footer Section */
.footer-section {
  margin-top: 20px;
 
}

.footer-button.logout {
  background-color: #141312;
  color: #ffffff;
}

.footer-button.logout:hover {
  background-color: #080808;
}

/* Terms Section */
.terms-content {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
