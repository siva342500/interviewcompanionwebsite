<template>
  <div class="app-container">
    <AppHeader :notificationCount="notificationCount"></AppHeader>
    <main class="main-content">
      <section class="account-section">
        <h1 class="section-title">Student Account</h1>
        <div class="button-card">
          <router-link
            class="action-button"
            :to="`/student-personal/${studentId}`"
            >Personal Details</router-link
          >
          <router-link
            class="action-button"
            :to="`/student-wallet/${studentId}`"
            >Wallet</router-link
          >
          <router-link class="action-button" :to="`/refer-friend/${studentId}`"
            >Refer a Friend</router-link
          >
          <router-link
            class="action-button"
            :to="`/student-payment-history/${studentId}`"
            >Payment History</router-link
          >
          <router-link
            class="action-button"
            :to="`/student-contact-us/${studentId}`"
            >Contact Us</router-link
          >
        </div>
        <div class="footer-section">
          <button class="footer-button logout" @click="logout">Logout</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "StudentAccountPage",
  components: {
    AppHeader,
  },
  data() {
    return {
      studentId: localStorage.getItem("studentId"), // Get studentId from localStorage
      notificationCount: 0,
    };
  },
  created() {
    const storedCount = localStorage.getItem("notificationCount");
    this.notificationCount = storedCount ? parseInt(storedCount, 10) : 0; // Get count from local storage
  },
  methods: {
    logout() {
      // You can clear any user session data here if needed
      localStorage.removeItem("studentId"); // For example, clear studentId from localStorage

      // Navigate to the home page
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

<style scoped>
/* Add your styles here */
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
/* .app-header {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 15px 0;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
} */

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
