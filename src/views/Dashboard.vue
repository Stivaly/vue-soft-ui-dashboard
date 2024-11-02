<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Usuarios Totales"
          value="327"
          :percentage="{
            value: '+505%',
            color: 'text-primary',
          }"
          :icon="{
            component: 'ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Usuarios En Línea"
          value="30"
          :percentage="{
            value: '+3%',
            color: 'text-primary',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Disponibilidad"
          value="200 Horas"
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <mini-statistics-card
          title="Servicios Activos"
          value="5"
          :percentage="{
            value: '+5%',
            color: 'text-primary',
          }"
          :icon="{
            component: 'ni ni-cart',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-4">
                <div class="d-flex flex-column h-100">
                  <p class="mb-1 pt-2 text-bold">Conexiones al Servicio</p>
                  <h5 class="font-weight-bolder">Tráfico</h5>
                  <br><br><br>
                  <div class="position-relative top-0 start-50 translate-middle-x text-center">
                    <i class="fa fa-arrow-up text-primary"></i>
                    <span class="font-weight-bold">4% más</span> en 2024
                  </div>
                
                </div>
              </div>
              
                <div class="border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />

                  <div class="card z-index-2">

                    <gradient-line-chart
                        id="chart-line"
                        :chart="{
                          labels: [
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ],
                          datasets: [
                            {
                              label: 'Mobile Apps',
                              data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                            },
                            {
                              label: 'Websites',
                              data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                            },
                          ],
                        }"
                      />
                  </div>

           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-12 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              id="chart-bar"
              title="Usuarios Activos"
              description="(<strong class='text-success'>+23%</strong>) que la semana pasada"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: 'Sales',
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: 'users',
                  progress: { content: '37K', percentage: 60 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'clicks',
                  progress: { content: '2m', percentage: 90 },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: 'Sales',
                  progress: { content: '435$', percentage: 30 },
                },
                {
                  icon: { color: 'danger', component: faScrewdriverWrench },
                  label: 'Items',
                  progress: { content: '43', percentage: 50 },
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
// import TimelineList from "./components/TimelineList.vue";
// import TimelineItem from "./components/TimelineItem.vue";
// import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-primary",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    // ProjectsCard,
    // TimelineList,
    // TimelineItem,
  },
  mounted() {
    if (this.isTokenExpired()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        console.log('El token ha expirado y ha sido eliminado.');

        this.$router.push('/sign-in'); 
    }

    const token = localStorage.getItem('authToken');
    console.log('Sesion iniciada con token:', token);
  },
  methods: {
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
