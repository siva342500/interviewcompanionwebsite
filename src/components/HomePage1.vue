<template>
  <div id="app">
    <!-- Header Section -->
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
      <!-- Home Page -->
      <div v-if="activePage === 'home' && !showOnlyInterviewForm">
        <section class="services">
          <h1>Services</h1>
          <div class="service-card">
            <div class="button-group">
              <button
                class="reserve"
                @click="showStudentInterviewForm('Reserve Your Companion')"
              >
                Reserve Your Interview
              </button>
              <button class="reserve">Refer a Friend</button>
            </div>
          </div>
        </section>

        <section class="upcoming-services">
          <h2>Upcoming Services</h2>
          <div class="service-card">
            <div class="button-group">
              <button class="reserve">Reserve Your Mock Interview</button>
              <button class="reserve">Reserve Your Training</button>
              <button class="reserve">Reserve Your Resume Prep</button>
            </div>
          </div>
        </section>

        <section class="coming-soon">
          <h3>Coming Soon</h3>
          <div class="service-card">
            <div class="button-group">
              <button class="reserve">PHP Training</button>
              <button class="reserve">HTML Training</button>
            </div>
          </div>
        </section>
      </div>

      <!-- Render StudentInterviewForm when toggled -->
      <section v-if="showOnlyInterviewForm" class="interview-form-section">
        <StudentInterviewForm :quaram="selectedQuaram" />
      </section>

      <!-- Notification Page -->
      <div v-if="activePage === 'notification'">
        <StudentNotification />
      </div>

      <!-- Activity Page -->
      <div v-if="activePage === 'activity'">
        <StudentActivity />
      </div>

      <!-- Account Page -->
      <div v-if="activePage === 'account'">
        <StudentAccount />
      </div>
    </main>
  </div>
</template>

<script>
import StudentNotification from "./StudentNotificationPage.vue";
import StudentInterviewForm from "./StudentInterviewForm.vue";
import StudentAccount from "./StudentAccount.vue";
import StudentActivity from "./StudentActivity.vue";

export default {
  name: "App",
  data() {
    return {
      activePage: "home", // Default active page
      showOnlyInterviewForm: false, // Controls visibility of only StudentInterviewForm
      selectedQuaram: null, // Holds the quaram value to pass
    };
  },
  methods: {
    setActivePage(page) {
      this.activePage = page;
      this.showOnlyInterviewForm = false; // Reset form visibility when changing pages
    },
    showStudentInterviewForm(quaram) {
      this.showOnlyInterviewForm = true; // Show only the form
      this.selectedQuaram = quaram; // Set the passed quaram value
    },
  },
  components: {
    StudentNotification,
    StudentInterviewForm,
    StudentAccount,
    StudentActivity,
  },
};
</script>

<style>
/* (The CSS remains unchanged from your original code) */
</style>

<style>
/* Global Styles */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styling */
.app-header {
  --background-color: #000000 !important;
  --color: rgb(255, 255, 255) !important;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #000000;
  color: rgb(255, 255, 255);
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
  background-color: #000000;
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
  background-color: #000000;
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
  background-color: rgb(20, 19, 19);
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
  background-color: #0d0f0dd3;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reserve:hover {
  background-color: rgb(2, 2, 2);
  color: white;
}

/* Interview Form Section */
.interview-form-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #000000;
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
