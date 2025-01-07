<template>
  <!-- Footer -->
  <footer class="bg-black text-white py-5">
    <div class="container">
      <!-- Centered Columns: Company, Services, Contact Us, and Social Links -->
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
        <!-- Contact Us, Social Links, and Download Buttons -->
        <div class="col-md-6">
          <div class="row">
            <!-- Contact Us Column -->
            <div class="col-md-6 text-center">
              <h5>Contact Us</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="text-white text-decoration-none"
                    >Help Center</a
                  >
                </li>
                <li>
                  <a href="#" class="text-white text-decoration-none"
                    >Support</a
                  >
                </li>
                <li>
                  <a href="#" class="text-white text-decoration-none"
                    >Privacy Policy</a
                  >
                </li>
              </ul>
            </div>
            <!-- Social Links Column -->
            <div class="col-md-6 text-center">
              <h5>Social Links</h5>
              <div class="social-icons d-flex justify-content-center mt-3">
                <a href="#" class="text-white me-3"
                  ><i class="fab fa-facebook"></i
                ></a>
                <a href="#" class="text-white me-3"
                  ><i class="fab fa-twitter"></i
                ></a>
                <a href="#" class="text-white me-3"
                  ><i class="fab fa-instagram"></i
                ></a>
                <a href="#" class="text-white"
                  ><i class="fab fa-linkedin"></i
                ></a>
              </div>
              <button class="btn me-3" @click="navigateToAndroid">
                <img
                  src="../../public/andriod app.webp"
                  alt="Download Android"
                  style="width: 100px; margin-left: 50px; margin-top: 10px"
                />
              </button>
              <!-- Download iOS Button -->
              <button class="btn me-3" @click="navigateToIOS">
                <img
                  src="../../public/andriod.webp"
                  alt="Download iOS"
                  style="width: 100px; margin-left: 50px"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="text-center mt-4">
        <div class="d-flex justify-content-center align-items-center">
          <h5 class="mb-0 me-2">Interview Companion</h5>
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
        <p class="mt-3">
          Copyright © 2025 Interview Companion - vv solutions.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    navigateToAndroid() {
      // Navigate to the Android app page/component
      this.$router.push("/download-android");
    },
    navigateToIOS() {
      // Navigate to the iOS app page/component
      this.$router.push("/download-ios");
    },
  },
};
</script>

<style scoped>
/* Footer Styles */
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

/* Social Icons Styling */
.social-icons a {
  color: white;
  font-size: 20px;
  margin: 0 10px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #007bff; /* Hover color */
}

/* Download Buttons Styling */
button.btn-dark {
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.btn-dark:hover {
  background-color: #333;
}

button.btn-dark img {
  width: 20px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .social-icons {
    justify-content: center;
  }
  .col-md-6.text-center {
    margin-bottom: 20px;
  }
}
</style>
