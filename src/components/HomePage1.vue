<template>
  <div id="app">
    <!-- Header Component -->
    <HeaderComponent :activePage="activePage" @setActivePage="setActivePage" />

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
import HeaderComponent from "./AppHeader.vue";
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
    HeaderComponent,
    StudentNotification,
    StudentInterviewForm,
    StudentAccount,
    StudentActivity,
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
