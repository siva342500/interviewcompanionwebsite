<template>
  <!-- Footer -->
  <footer class="bg-black text-white py-5">
    <div class="container">
      <!-- Centered Columns: Company, Services, Contact Us -->
      <div class="row justify-content-center">
        <div class="col-md-3 text-center">
          <h5>Company</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-white text-decoration-none">About Us</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Our Offerings</a
              >
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Newsroom</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Careers</a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 text-center">
          <h5>Services</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Interview Support</a
              >
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Training</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Job Support</a
              >
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Resume Preparation</a
              >
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Coding Tests Support</a
              >
            </li>
          </ul>
        </div>
        <div class="col-md-3 text-center">
          <h5>Contact Us</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Help Center</a
              >
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none">Support</a>
            </li>
            <li>
              <a href="#" class="text-white text-decoration-none"
                >Privacy Policy</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Text Below the Columns -->
      <div class="text-center mt-4">
        <div class="d-flex justify-content-center align-items-center">
          <!-- Interview Companion Text -->
          <h5 class="mb-0 me-2">Interview Companion</h5>

          <!-- Logo Image -->
          <img
            src="../../public/logo.jpeg"
            style="
              width: 40px;
              height: 40px;
              margin-top: 5px;
              margin-left: 10px;
            "
            alt="Logo"
          />
        </div>

        <!-- Copyright Text Below -->
        <p class="mt-3">
          Copyright © 2025 Interview Companion - All Rights Reserved.
        </p>
      </div>

      <!-- Social Media and Language/Location -->
      <div class="d-flex justify-content-start align-items-center mt-4">
        <div class="social-icons">
          <a href="#" class="text-white me-3"
            ><i class="fab fa-facebook"></i
          ></a>
          <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-white me-3"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer Style */
footer {
  margin-top: 50px;
}

footer h5 {
  font-weight: bold;
}

footer ul {
  list-style: none;
  padding-left: 0;
}

footer ul li {
  margin-bottom: 10px;
}

footer ul li a {
  color: white;
  text-decoration: none;
}

footer ul li a:hover {
  text-decoration: underline;
}

.social-icons a {
  color: white;
  font-size: 20px;
  margin: 0 10px;
}

/* Align social media icons to the left */
footer .d-flex.justify-content-start {
  justify-content: flex-start;
}

footer .text-center {
  margin-top: 20px;
}

footer .d-flex.justify-content-center {
  justify-content: center;
  align-items: center;
}

/* Add these styles to center the columns in the footer */
.row.justify-content-center {
  display: flex;
  justify-content: center;
}

.col-md-3 {
  text-align: left;
}
</style>
