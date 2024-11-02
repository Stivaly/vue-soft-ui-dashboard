<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-primary"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-primary text-gradient">
                    Bienvenido Devuelta
                  </h3>
                  <p class="mb-0">Ingresa tu usuario y contraseña para inciar sesión</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Nombre de Usuario</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Nombre de Usuario"
                      v-model="form.username"
                      class="form-control"
                      required
                      />
                    <label>Contraseña</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      v-model="form.password"
                      class="form-control"
                      required
                    />
                    <soft-switch id="rememberMe" name="rememberMe" checked>
                      Recordarme
                    </soft-switch>
                    <div class="text-center">
                      <soft-button
                        type="button"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="primary"
                        full-width
                        @click="submitForm"
                        >Iniciar Sesión
                      </soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    ¿No tienes cuenta?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-primary text-gradient font-weight-bold"
                      >Inicia Sesión</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/login.jpg') +
                      ')',
                      backgroundPosition: 'bottom',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import axios from "axios";
// import SoftInput from "@/components/SoftInput.vue";
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,
    // SoftInput,
    SoftSwitch,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
        form: {
          username: '',
          password: '',
        },
        errorMessage: '',
      }
    },
    mounted() {
      if (!this.isTokenExpired() && localStorage.getItem('authToken')) {
        console.log('Ya hay un token válido, redirigiendo al dashboard...');
        this.$router.push('/dashboard');
      }
      
    },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async submitForm() {
        console.log(this.form);
        try {
          const response = await axios.post('https://goalstats-api.onrender.com/api/login/', this.form)
          if (response.status === 200) {
            // Suponiendo que el token viene en la respuesta
            const token = response.data.token; 
            console.log(token)// Ajusta según cómo se devuelve el token en la respuesta
            const now = new Date();
            const expirationDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 días en milisegundos
            
            // Guardar el token y la fecha de expiración en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', expirationDate.toISOString()); // Almacena la fecha como cadena
            this.$router.push('/dashboard/'); // Redirige a la página de dashboard o a donde sea necesario
          };
          console.log(response) 
          console.log(response.data);

        } catch (error) {
          console.error('Error al registrar:', error);
          if (error.response) {
            // Errores HTTP (como 400 o 500)
            if (error.response.status === 400) {
              this.errorMessage = 'Datos inválidos. Por favor, Verifica tus credenciales.';
            } else if (error.response.status === 401) {
              this.errorMessage = 'No autorizado. Verifica tus credenciales.';
            } else if (error.response.status === 500) {
              this.errorMessage = 'Error del servidor. Contacta al administrador del sistema.';
            } else {
              this.errorMessage = `Error ${error.response.status}: ${error.response.data.message}`;
            }
          } else if (error.request) {
            // No se recibió respuesta
            this.errorMessage = 'No se pudo conectar al servidor. Revisa tu conexión de internet.';
          } else {
            // Otros errores desconocidos
            this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente más tarde.';
          };
        };
      },
      isTokenExpired() {
        const expiration = localStorage.getItem('tokenExpiration');
        console.log('Fecha de expiración del token:', expiration);
        if (!expiration) return true;

        const now = new Date();
        return now > new Date(expiration); // Retorna true si ya expiró
      },
  },
};
</script>
