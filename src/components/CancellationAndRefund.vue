<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Cancellation and Refund Section -->
    <section class="cancellation-and-refund">
      <div class="container">
        <h1 class="text-center mb-5">Cancellation and Refund Policy</h1>

        <div class="content mb-5">
          <h2>1. Introduction</h2>
          <p>
            This Cancellation and Refund Policy outlines the terms and
            conditions regarding cancellations and refunds for the services
            provided by Interview Companion.
          </p>

          <h2>2. Cancellation Policy</h2>
          <p>
            Users may cancel their bookings within the specified timeframe. To
            ensure a seamless process, please adhere to the cancellation rules
            outlined during booking.
          </p>

          <h2>3. Refund Eligibility</h2>
          <p>
            Refunds are subject to our review and approval. Refunds may only be
            issued for valid cancellations made within the acceptable
            cancellation period.
          </p>

          <h2>4. Non-Refundable Services</h2>
          <p>
           Certain services may be non-refundable. These include last-minute
            bookings or services explicitly mentioned as non-refundable.
            Additionally, Interview Companion reserves the right to approve or
            deny any refund request at its sole discretion, and refunds may not
            be granted under any circumstances deemed necessary by the platform.
          </p>

          <h2>5. Refund Process</h2>
          <p>
            Refunds will be processed within 7-10 business days after approval.
            The refund amount will be credited to the Wallet.
          </p>

          <h2>6. Amendments</h2>
          <p>
            Interview Companion reserves the right to amend this policy at any
            time. Users are encouraged to review this policy regularly for any
            updates or changes.
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
  name: "CancellationAndRefund",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
/* Cancellation and Refund Section */
.cancellation-and-refund {
  padding: 60px 0;
}

.cancellation-and-refund h1 {
  font-weight: bold;
  color: black;
}

.cancellation-and-refund h2 {
  font-weight: 600;
  color: black;
}

.cancellation-and-refund p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
}

.cancellation-and-refund button {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
