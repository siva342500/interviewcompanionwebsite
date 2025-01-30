<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Terms and Conditions Section -->
    <section class="terms-and-conditions">
      <div class="container">
        <h1 class="text-center mb-5">Terms and Conditions</h1>

        <div class="content mb-5">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Interview Companion. These terms and conditions outline
            the rules and regulations for the use of our services. By accessing
            this platform, you agree to comply with these terms. If you do not
            agree, you may not use our services.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            To use our services, you must be at least 18 years of age. By using
            this platform, you represent and warrant that you meet this
            eligibility requirement.
          </p>

          <h2>3. Use of Services</h2>
          <p>
            The services provided by Interview Companion are intended solely for
            lawful purposes. Users agree not to engage in any activity that
            violates local, national, or international laws or regulations.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, including text, graphics, logos, and images, is the
            intellectual property of Interview Companion. Unauthorized use,
            reproduction, or distribution of this content is prohibited.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            Interview Companion is not responsible for any direct, indirect, or
            incidental damages resulting from the use or inability to use our
            services. This limitation applies to all aspects of the platform.
          </p>

          <h2>6. Amendments</h2>
          <p>
            We reserve the right to update or modify these terms and conditions
            at any time. Users are encouraged to review this page regularly for
            updates. Continued use of the platform signifies acceptance of any
            changes.
          </p>
        </div>

        <!-- <div class="text-center">
          <button class="btn btn-primary me-3">Back to Home</button>
          <button class="btn btn-success">Contact Us</button>
        </div> -->
      </div>
    </section>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/HeaderPage.vue";
import Footer from "@/components/FooterPage.vue";

export default {
  name: "TermsAndConditions",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
/* Terms and Conditions Section */
.terms-and-conditions {
  padding: 60px 0;
}

.terms-and-conditions h1 {
  font-weight: bold;
  color:black;
}

.terms-and-conditions h2 {
  font-weight: 600;
  color: black;
}

.terms-and-conditions p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
}

.terms-and-conditions button {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
