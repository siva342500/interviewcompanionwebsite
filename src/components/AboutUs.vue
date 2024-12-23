<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- About Us Section -->
    <section class="about-us">
      <div class="container">
        <h1 class="text-center mb-5">The Interview Companion Story!</h1>

        <div class="row mb-5">
          <div class="col-md-6">
            <img
              src="../../public/siderimages1.jpg"
              alt="Our Beginnings"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-md-6">
            <h2>Our Vision and Mission</h2>
            <p>
              "Interview Companion" was born out of a desire to help job seekers
              and professionals achieve their career goals. Our mission is to
              provide a one-stop platform for interview preparation, career
              guidance, and skill enhancement, empowering individuals to succeed
              in their professional endeavors with confidence.
            </p>
            <button class="btn btn-primary me-3">Get Started</button>
            <button class="btn btn-success">Contact Us</button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h2>Why Choose Us?</h2>
            <p>
              At Interview Companion, we bring together a team of experienced
              career coaches, HR professionals, and software developers to
              create tools and resources that simplify the interview process.
              Whether you're a student, a recent graduate, or a seasoned
              professional, we've got you covered with expert guidance and
              personalized solutions.
            </p>
          </div>
          <div class="col-md-6">
            <img
              src="../../public/siderimages4.jpg"
              alt="Our Team"
              class="img-fluid rounded"
            />
          </div>
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
  name: "AboutUs",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
/* Header Styles */
.navbar {
  background-color: black; /* Set background to black */
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar .navbar-brand {
  color: white; /* Brand text color white */
  font-weight: bold;
}

.navbar .nav-link {
  color: white; /* Set link color to white */
}

.navbar .nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}

.navbar .nav-link:hover {
  color: #007bff; /* Optional hover color (blue) */
}

.navbar-toggler {
  border-color: white;
}

.navbar-toggler-icon {
  background-color: white; /* Set toggle icon to white */
}

/* About Us Section */
.about-us {
  padding: 60px 0;
}

.about-us h1 {
  font-weight: bold;
  color: #333;
}

.about-us h2 {
  font-weight: 600;
  color: #007bff;
}

.about-us p {
  line-height: 1.8;
  color: #555;
}

.about-us img {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.about-us button {
  font-size: 16px;
  padding: 10px 20px;
}

/* Footer */
footer {
  background-color: #333;
  color: #fff;
}

footer h5 {
  font-weight: bold;
}

footer a {
  text-decoration: none;
  color: #fff;
}

footer a:hover {
  text-decoration: underline;
}
</style>
