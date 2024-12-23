<template>
  <div class="app-container">
    <!-- Main Content -->
    <main class="main-content">
      <section v-if="!showPersonalDetails && !showWalletDetails && !showReferAFriend && !showContactUs && !showPaymentHistory && !showTermsCondition" class="account-section">
        <h1 class="section-title">Student Account</h1>

        <!-- Buttons in a card structure -->
        <div class="button-card">
          <button class="action-button" @click="showSection('personalDetails')">Personal Details</button>
          <button class="action-button" @click="showSection('wallet')">Wallet</button>
          <button class="action-button" @click="showSection('referAFriend')">Refer a Friend</button>
          <button class="action-button" @click="showSection('paymentHistory')">Payment History</button>
          <button class="action-button" @click="showSection('contactUs')">Contact Us</button>
          <a class="terms" @click="showSection('termsCondition')">Terms and Conditions</a>
        </div>
          <div class="footer-section">
          <button class="footer-button logout">Logout</button>
        </div>
      </section>

      <!-- Personal Details Component -->
      <section v-if="showPersonalDetails" class="details-section">
        <StudentPersonalDetails @closeDetails="closeSection('personalDetails')" />
      </section>

      <!-- Wallet Details Component -->
      <section v-if="showWalletDetails" class="details-section">
        <StudentWalletDetails @closeDetails="closeSection('wallet')" />
      </section>

      <!-- Refer a Friend Component -->
      <section v-if="showReferAFriend" class="details-section">
        <ReferAFriend @closeDetails="closeSection('referAFriend')" />
      </section>

      <!-- Contact Us Component -->
      <section v-if="showContactUs" class="details-section">
        <StudentContactUs @closeDetails="closeSection('contactUs')" />
      </section>

      <!-- Payment History Component -->
      <section v-if="showPaymentHistory" class="details-section">
        <StudentPaymentHistory @closeDetails="closeSection('paymentHistory')" />
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
// Import the components for Personal Details, Wallet, Payment History, Refer a Friend, and Contact Us
import StudentPersonalDetails from "@/components/StudentPersonalDetails.vue";
import StudentWalletDetails from "@/components/StudentWallet.vue";
import StudentPaymentHistory from "@/components/StudentPaymentHistory.vue";
import ReferAFriend from "@/components/ReferAFriend.vue";
import StudentContactUs from "@/components/StudentContactUs.vue";

export default {
  name: "StudentAccountPage",
  components: {
    StudentPersonalDetails,
    StudentWalletDetails,
    StudentPaymentHistory,
    ReferAFriend,
    StudentContactUs,
  },
  data() {
    return {
      showPersonalDetails: false,
      showWalletDetails: false,
      showReferAFriend: false, // New for Refer a Friend
      showContactUs: false, // New for Contact Us
      showPaymentHistory: false,
      showTermsCondition: false,
    };
  },
  methods: {
    showSection(section) {
      // Reset all sections visibility
      this.showPersonalDetails = false;
      this.showWalletDetails = false;
      this.showReferAFriend = false;
      this.showContactUs = false;
      this.showPaymentHistory = false;
      this.showTermsCondition = false;

      // Enable the selected section
      if (section === "personalDetails") {
        this.showPersonalDetails = true;
      } else if (section === "wallet") {
        this.showWalletDetails = true;
      } else if (section === "referAFriend") {
        this.showReferAFriend = true;
      } else if (section === "contactUs") {
        this.showContactUs = true;
      } else if (section === "paymentHistory") {
        this.showPaymentHistory = true;
      } else if (section === "termsCondition") {
        this.showTermsCondition = true;
      }
    },
    closeSection(section) {
      if (section === "personalDetails") {
        this.showPersonalDetails = false;
      } else if (section === "wallet") {
        this.showWalletDetails = false;
      } else if (section === "referAFriend") {
        this.showReferAFriend = false;
      } else if (section === "contactUs") {
        this.showContactUs = false;
      } else if (section === "paymentHistory") {
        this.showPaymentHistory = false;
      } else if (section === "termsCondition") {
        this.showTermsCondition = false;
      }
    },
  },
};
</script>

<style scoped>
/* Styling remains unchanged */
</style>


<style scoped>
/* Styling remains the same as your previous styles for wallet and personal details */

/* App Container */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

/* Header Styling */
.app-header {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 15px 0;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

/* Main Content Styling */
.main-content {
  flex: 1;
  padding: 20px;
}

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

/* Buttons Styling */
.button-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.action-button {
  background-color: #c6c7c6;
  color: rgb(7, 6, 6);
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  text-align: center;
}

.action-button:hover {
  background-color: #efefef;
}

/* Section Content Styling */
.section-content {
  margin-top: 20px;
}

.section-details {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-details h2 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.section-details p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

/* Terms and Conditions Section */
.terms-content {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.terms-content h2 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.terms-content p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

/* Footer Buttons */
.footer-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.terms {
  text-align: center;
  color: black;
}

.footer-button {
  background-color: #e0e0e0;
  color: #333;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.footer-button:hover {
  background-color: #d6d6d6;
}

.footer-button.logout {
  background-color: #141312;
  color: rgb(255, 255, 255);
}

.footer-button.logout:hover {
  background-color: #080808;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 18px;
  }

  .action-button {
    font-size: 14px;
    padding: 12px;
  }

  .footer-button {
    font-size: 12px;
    padding: 10px;
  }
}
</style>
