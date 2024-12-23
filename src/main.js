import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import router
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BootstrapVue3 from "bootstrap-vue-3";

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router); // Use the router
app.mount("#app"); // Mount the app to the DOM
