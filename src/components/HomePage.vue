<template>
  <div>
    <!-- Header Component -->
    <HeaderPage />

    <!-- Main Content -->
    <router-view></router-view>

    <main class="container mt-5">
      <div class="row align-items-center">
        <!-- Left Side Text -->
        <div class="col-md-6">
          <h2>Welcome to Interview Companion</h2>
          <p>
            Prepare for your interviews with confidence! Access a wide range of
            resources, including mock interview practice, resume building tools,
            and expert tips to help you land your dream job.
          </p>
          <ul>
            <li>Real-time interview support with experts</li>
            <li>Mock interview practice with real humans</li>
            <li>Professional resume building assistance</li>
            <li>Crack the coding test with real-time support</li>
          </ul>
          <button
            class="btn bg-black mt-3"
            @click="navigateToLogin"
            style="color: white"
          >
            Reserve Your Companion
          </button>
        </div>

        <!-- Right Side Video -->
        <div class="col-md-6">
          <div class="video-container">
            <!-- Video Player -->
            <video width="100%" height="315" controls>
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Component -->
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  components: {
    HeaderPage,
    FooterPage,
  },
  methods: {
    navigateToLogin() {
      this.$router.push("/registrationform");
    },
  },
};
</script>

<style scoped>
/* General Styling */
.video-container {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

button.btn-dark {
  background-color: black; /* Black background */
  color: white; /* White text */
  border: none; /* Remove border */
  padding: 10px 20px; /* Add padding for better appearance */
  font-size: 16px; /* Adjust font size */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

button.btn-dark:hover {
  background-color: #000000; /* Slightly lighter black on hover */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .video-container {
    margin-top: 20px;
  }
}
</style>
