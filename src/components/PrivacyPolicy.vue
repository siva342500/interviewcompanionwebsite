<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Privacy Policy Section -->
    <section class="privacy-policy">
      <div class="container">
        <h1 class="text-center mb-5">Privacy Policy</h1>

        <div class="content mb-5">
          <h2>1. Introduction</h2>
          <p>
            At Interview Companion, your privacy is of utmost importance to us.
            This Privacy Policy outlines how we collect, use, and protect your
            personal information when you use our platform.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul>
            <li>Personal identification information (name, email address, phone number, etc.)</li>
            <li>Technical data (IP address, browser type, device information, etc.)</li>
            <li>Usage data (pages visited, time spent on the platform, etc.)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Communicate updates and promotional offers</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted partners to provide
            essential services, such as payment processing or email
            notifications.
          </p>

          <h2>5. Security</h2>
          <p>
            We implement robust security measures to protect your data. However,
            no method of transmission over the Internet is 100% secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of receiving promotional communications</li>
            <li>File a complaint if you believe your privacy rights have been violated</li>
          </ul>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we encourage you to review the
            policy regularly.
          </p>
        </div>

        <div class="text-center">
          <button class="btn btn-primary me-3" @click="$router.push('/')">Back to Home</button>
          <button class="btn btn-success">Contact Us</button>
        </div>
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
  name: "PrivacyPolicy",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
/* Privacy Policy Section */
.privacy-policy {
  padding: 60px 0;
}

.privacy-policy h1 {
  font-weight: bold;
  color: black;
}

.privacy-policy h2 {
  font-weight: 600;
  color: black;
}

.privacy-policy p,
.privacy-policy ul {
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
}

.privacy-policy ul {
  padding-left: 20px;
}

.privacy-policy button {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
