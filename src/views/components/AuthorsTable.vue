<template>

        <div class="card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0 text-center">Disciplinas Registradas</h6>
          </div>
          <div class="p-3 card-body">
            <select class="form-control" v-model="selectedDisciplina">
              <option v-for="(disciplina, index) in disciplinas" :key="index" :value="disciplina.nombre_disciplina">
                {{ disciplina.nombre_disciplina }} - {{ disciplina.descripcion }}
              </option>
            </select>

          </div>
        </div><br>


  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Usuarios</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nombre
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Rol
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Disciplina
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Fecha de Creación
              </th>
              
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acción
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar
                      :img=getUserImg(user.role)
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ user.discipline }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <soft-badge :color="getRoleStyle(user.role).color" variant="gradient" size="sm"
                  >{{ user.role }}</soft-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ user.discipline }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ user.creationDate }}</span
                >
              </td>
              <td class="align-middle text-center">
                <button class="btn btn-link" @click="editUser(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4F1C77" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                  </button>
                  <button class="btn btn-link" @click="deleteUser(user.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9E0000" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal for Editing User -->
        <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div v-if="selectedUser && selectedUser.id" class="modal-body">
                <div class="form-group">
                  <label for="userName">Nombre</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.name">
                </div>
                <div class="form-group">
                  <label for="userRole">Rol</label>
                  <select class="form-control" id="userRole" v-model="selectedUser.role">
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Entrenador">Entrenador</option>
                    <option value="Deportista">Deportista</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="userDiscipline">Disciplina</label>
                  <select class="form-control" id="userDiscipline" v-model="selectedUser.discipline">
                    <option value="Futbol">Futbol</option>
                    <option value="Basquetbol">Basquetbol</option>
                    <option value="Tenis">Tenis</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="saveUserChanges">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

export default {
  name: "authors-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      users: [
        { id: 1, name: 'David Wagner', role: 'Super Admin', discipline: 'Futbol', creationDate: '24 Oct, 2015' },
        { id: 2, name: 'Ina Hogan', role: 'Admin', discipline: 'Basquetbol', creationDate: '24 Oct, 2015' },
        { id: 3, name: 'Devin Harmon', role: 'Entrenador', discipline: 'Tenis', creationDate: '18 Dec, 2015' },
        { id: 4, name: 'Lena Page', role: 'Deportista', discipline: 'Futbol', creationDate: '8 Oct, 2016' },
        { id: 5, name: 'Eula Horton', role: 'Admin', discipline: 'Basquetbol', creationDate: '15 Jun, 2017' },
        { id: 6, name: 'Victoria Perez', role: 'Entrenador', discipline: 'Tenis', creationDate: '12 Jan, 2019' },
        { id: 7, name: 'Cora Medina', role: 'Deportista', discipline: 'Futbol', creationDate: '21 July, 2020' },
      ],
      roleStyles: {
        'Super Admin': { color: 'warning', img: img1 },
        'Admin': { color: 'info', img: img2 },
        'Entrenador': { color: 'success', img: img3 },
        'Deportista': { color: 'secondary', img: img4 },
        'default': 'badge badge-default'
      },
      selectedUser: {},
      disciplinas: [],
    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
  },
  async mounted() {
    try {
      const response = await axios.get('https://goalstats-api.onrender.com/api/disciplines/');
      this.disciplinas = response.data;

      console.log(this.disciplinas)

      
    } catch (error) {
      console.error('Error al obtener las disciplinas:', error);
    };
  },
  methods: {
    getRoleStyle(role) {
      return this.roleStyles[role] || this.roleStyles['default'];
    },
    getUserImg(role) {
      console.log(role);
      return this.roleStyles[role]?.img;
    },
    editUser(user) {
      this.selectedUser = { ...user }; // Copiar el usuario seleccionado
      const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
      modal.show();
    },
    saveUserChanges() {
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, this.selectedUser);
      }
      this.selectedUser = null;
      const modalElement = document.getElementById('editUserModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    },


  }
};
</script>
