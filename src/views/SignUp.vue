<template>
  <navbar btn-background="bg-gradient-primary" />
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/balls-8049598_1280.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-3"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Bienvenido</h1>
          <p class="text-white text-lead">
            El esfuerzo que haces hoy te acerca un paso más a tus objetivos. 
            La constancia siempre rinde frutos.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>Registro</h5>
          </div>
          <div class="card-body">
            <form role="form">
              <div class="mb-3">
                <input
                id="username"
                type="text"
                placeholder="Nombre de Usuario"
                v-model="form.username"
                class="form-control"
                required
                />
                <span v-if="isLimitReached" class="limit-warning">Has alcanzado el límite de 30 caracteres.</span>
              </div>
              <div class="mb-3">
                <input
                  id="email"
                  type="email"
                  placeholder="Correo"
                  v-model="form.email"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  v-model="form.password"
                  class="form-control"
                  required
                  @input="validatePassword"
                />
                <span v-if="!isPasswordValid" class="text-danger text-center">La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.</span>
              </div>
              <div class="mb-3">
                <select
                  id="role"
                  v-model="selectedRole"
                  class="form-control"
                  required
                >
                  <option value="" disabled>Seleccione un Rol</option>
                  <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
                </select>
              </div>
              <soft-checkbox
                id="flexCheckDefault"
                username="flexCheckDefault"
                class="font-weight-light"
                checked
              >
                Acepto los
                <a href="javascript:;" class="text-dark font-weight-bolder"
                  >Términos y Condiciones</a
                >
              </soft-checkbox>

              <div class="text-center">
                <soft-button
                  type="button"
                  color="primary"
                  full-width
                  variant="gradient"
                  class="my-4 mb-2"
                  @click="submitForm"
                  >Registrarse</soft-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                ¿Ya tienes cuenta?
                <router-link
                  :to="{ username: 'Sign In' }"
                  class="text-dark font-weight-bolder"
                >
                  Inicia Sesión
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import axios from 'axios';
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
// import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
// import SoftList from "@/components/softList.vue";

import { mapMutations } from "vuex";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

export default {
  username: "SignupBasic",
  components: {
    Navbar,
    AppFooter,
    // SoftInput,
    SoftCheckbox,
    SoftButton,
    // SoftList,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  data() {
    return {
      roles: [
        { value: 'COACH', label: 'Entrenador' },
        { value: 'PLAYER', label: 'Jugador' },
      ],
      form: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      selectedRole: '',
      isPasswordValid: true,
    }
  },
  computed: {
    isLimitReached() {
      return this.form.username.length >= 30;
    },
  },
  watch: {
    'form.password': function() {
      this.validatePassword();
    },
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    validatePassword() {
      const password = this.form.password;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length >= 8;
      this.isPasswordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
      this.$forceUpdate();
    },
    async submitForm() {
      if (!this.form.username || !this.form.email || !this.form.password || !this.selectedRole) {
        alert("Todos los campos son obligatorios." + this.form.username + this.form.email + this.form.password + this.selectedRole  );
        return;
      }
      this.form.role = this.selectedRole;
      console.log(this.form);
      try {
        const response = await axios.post('https://goalstats-api.onrender.com/api/register/', this.form);
        console.log(response) 
        console.log(response.data);
        
        if (response.status === 201) {
          alert('Registro exitoso');
          this.$router.push('/sign-in'); // Redirige a la página de dashboard o a donde sea necesario
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        alert('Error en el registro, intenta nuevamente.');
      };
    },
  },
  }
</script>
