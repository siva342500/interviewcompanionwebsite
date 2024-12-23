<template>
  <div id="app">
    <!-- Header Section for Expert -->
    <header class="app-header">
      <div class="header-content">
        <i class="fa fa-arrow-left back-arrow"></i>
        <h1 class="header-title">
          <span
            :class="{ active: activePage === 'home' }"
            @click="setActivePage('home')"
          >
            Home
          </span>
          <span
            :class="{ active: activePage === 'notification' }"
            @click="setActivePage('notification')"
          >
            Notification
          </span>
          <span
            :class="{ active: activePage === 'activity' }"
            @click="setActivePage('activity')"
          >
            Activity
          </span>
          <span
            :class="{ active: activePage === 'account' }"
            @click="setActivePage('account')"
          >
            Account
          </span>
        </h1>
        <img src="../../public/logo.jpeg" alt="Logo" class="logo" />
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="main-content">
      <!-- Expert Home Page -->
      <div v-if="activePage === 'home' && !showOnlyInterviewForm && !showReferExpertForm">
        <section class="services">
          <h1>Services</h1>
          <div class="service-card">
            <div class="button-group">
              <!-- Earn Money by Enrolling as Interview Companion -->
              <button
                class="reserve"
                @click="showExpertInterviewForm('Enroll as Interview Companion')"
              >
                Earn Money by Enrolling as Interview Companion
              </button>
              <!-- Refer a Friend Button -->
              <button class="reserve" @click="referExpert">
                Refer a Expert
              </button>
            </div>
          </div>
        </section>

        <section class="upcoming-services">
          <h2>Upcoming Services</h2>
          <div class="service-card">
            <div class="button-group">
              <!-- Reserve Mock Interview Button -->
              <button class="reserve">
                Enroll as Mock Interview Companion
              </button>
              <!-- Reserve Training Button -->
              <button class="reserve">Enroll as Training Companion</button>
              <!-- Reserve Resume Prep Button -->
              <button class="reserve">Enroll as Resume Prep Companion</button>
              <!-- Reserve Coding Test Button -->
              <button class="reserve">Enroll as Coding Test Companion</button>
            </div>
          </div>
        </section>
      </div>

      <!-- Render Expert Interview Form when toggled -->
      <section v-if="showOnlyInterviewForm" class="interview-form-section">
        <ExpertInterviewForm :quaram="selectedQuaram" />
      </section>

      <!-- Render Refer Expert Form when toggled -->
      <section v-if="showReferExpertForm" class="refer-expert-section">
        <ReferExpert />
      </section>

      <!-- Notification Page -->
      <div v-if="activePage === 'notification'">
        <ExpertNotification />
      </div>

      <!-- Activity Page -->
      <div v-if="activePage === 'activity'">
        <ExpertActivity />
      </div>

      <!-- Account Page -->
      <div v-if="activePage === 'account'">
        <ExpertAccount />
      </div>
    </main>
  </div>
</template>

<script>
import ExpertNotification from "./ExpertNotificationPage.vue";
import ExpertInterviewForm from "./ExpertInterviewForm.vue";
import ExpertAccount from "./ExpertAccount.vue";
import ExpertActivity from "./ExpertActivity.vue";
import ReferExpert from "./ReferExpert.vue"; // Import the new ReferExpert component

export default {
  name: "App",
  data() {
    return {
      activePage: "home", // Default active page
      showOnlyInterviewForm: false, // Controls visibility of only ExpertInterviewForm
      showReferExpertForm: false, // Controls visibility of the ReferExpert form
      selectedQuaram: null, // Holds the quaram value to pass
    };
  },
  methods: {
    setActivePage(page) {
      this.activePage = page;
      this.showOnlyInterviewForm = false; // Reset form visibility when changing pages
      this.showReferExpertForm = false; // Reset refer expert form visibility when changing pages
    },
    showExpertInterviewForm(quaram) {
      this.showOnlyInterviewForm = true; // Show only the form
      this.selectedQuaram = quaram; // Set the passed quaram value
    },
    referExpert() {
      this.showReferExpertForm = true; // Show the refer expert form
      this.showOnlyInterviewForm = false; // Hide the interview form if it's visible
    },
  },
  components: {
    ExpertNotification,
    ExpertInterviewForm,
    ExpertAccount,
    ExpertActivity,
    ReferExpert, // Register the ReferExpert component
  },
};
</script>

<style>
/* Global Styles */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styling */
.app-header {
  background-color: #000000;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.back-arrow {
  font-size: 20px;
  cursor: pointer;
}

.header-title span {
  cursor: pointer;
  padding: 5px 10px;
  font-size: 18px;
}

.header-title span.active {
  background-color: #8c8989;
  color: white;
  border-radius: 5px;
}

.logo {
  height: 40px;
  width: 40px;
  object-fit: cover;
}

/* Main Content Styling */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

.services,
.upcoming-services,
.coming-soon {
  margin-bottom: 30px;
}

h1,
h2,
h3 {
  margin: 20px 0 10px;
}

/* Service Card Styling */
.service-card {
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reserve {
  padding: 12px;
  background-color: #bcbebcd3;
  color: black;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reserve:hover {
  background-color: rgb(216, 213, 213);
  color: white;
}

/* Interview Form Section */
.interview-form-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Refer Expert Section */
.refer-expert-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .reserve {
    font-size: 14px;
    padding: 10px;
  }

  .header-title {
    font-size: 16px;
  }
}
</style>

