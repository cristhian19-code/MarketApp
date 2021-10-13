<template>
  <div>
    <SidebarVue :cancarrito="carrito.length"/>
    <ModalLoginVue/>
    <Nuxt />
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import { provide, ref } from '@nuxtjs/composition-api'
import SidebarVue from '../components/Sidebar.vue'
import ModalLoginVue from '../components/ModalLogin.vue'

export default {
  components: {
    SidebarVue,
    ModalLoginVue
  },
  computed:{
    ...mapState(['carrito','token']),
  },
  methods: {
    ...mapActions(['SetToken'])
  },
  setup() {
    const active = ref(false);

    provide('active',active)
  },
  async mounted() {
    const token = await localStorage.getItem('token')
    if(token){
      this.SetToken(token)
    }
  },
}
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
</style>
