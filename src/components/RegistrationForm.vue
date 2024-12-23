<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <div class="container text-center mt-5">
      <h2>Welcome to Interview Companion</h2>
      <p>Select your registration type:</p>
      <div class="mt-4">
        <router-link to="/student-register">
          <button class="btn btn-primary me-3 bg-black">
            Student Register
          </button>
        </router-link>
        <router-link to="/expert-register">
          <button class="btn btn-primary bg-black">Expert Register</button>
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
