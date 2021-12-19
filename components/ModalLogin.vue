<template>
  <vs-dialog blur v-model="activelogin">
      <template #header>
        <h4 class="not-margin">
          Welcome to <b>MarketOnline</b>
        </h4>
      </template>
      <div v-if="!change" class="con-form">
        <vs-input type="email" autocomplete v-model="login.email" placeholder="Email">
          <template #icon>
            @
          </template>
        </vs-input>
        <vs-input type="password" v-model="login.password" placeholder="Password">
          <template #icon>
            <i class='bx bxs-lock'></i>
          </template>
        </vs-input>
      </div>
      
      <div v-else class="con-form">
        <vs-input type="text" v-model="register.firstname" placeholder="Firstname">
          <template #icon>
            <i class='bx bxs-user'></i>
          </template>
        </vs-input>
        <vs-input type="text" v-model="register.lastname" placeholder="Lastname">
          <template #icon>
            <i class='bx bxs-user'></i>
          </template>
        </vs-input>
        <vs-input type="text" autocomplete v-model="register.phone" placeholder="Phone">
          <template #icon>
            <i class='bx bxs-phone'></i>
          </template>
        </vs-input>
        <vs-input type="email" autocomplete v-model="register.email" placeholder="Email">
          <template #icon>
            @
          </template>
        </vs-input>
        <vs-input type="password" v-model="register.password" placeholder="Password">
          <template #icon>
            <i class='bx bxs-lock'></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button v-if="!change" @click="Login()" block>
            Log in
          </vs-button>

          <vs-button v-else @click="Signup()" block>
            Sign up
          </vs-button>

          <div class="new" v-if="!change">
            New Here? <a href="#" @click="change = !change">Create New Account</a>
          </div>
          <div class="new" v-else>
            Do you already have an account? <a href="#" @click="change = !change">Log in</a>
          </div>
        </div>
      </template>
    </vs-dialog>
</template>

<script>
import { inject} from '@nuxtjs/composition-api'
import axios from 'axios';
import {mapActions} from 'vuex'

export default {
    setup() {
        const email = '';
        const password = ''
        const activelogin = inject('active')
        const change = false;
        
        const register= {
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          password:''
        }

        const login = {
          email: '',
          password:''
        }
        return {
            activelogin,
            email,
            password,
            change,
            register,
            login
        }
    },
    methods: {
      async Signup(){
          axios('https://apimarketapp.herokuapp.com/signup',{
            method: 'POST',
            data: this.register
          }).then(res => {
            this.openNotification('top-right','success','Registro', res.data.data,' fuiste registrado exitosamente')

            this.register= {
              firstname: '',
              lastname: '',
              phone: '',
              email: '',
              password:''
            }

            this.activelogin = false
          }).catch(err=>{
            this.openNotification('top-right','danger','Registro','Hubo un error', '')
          })
      },
      async Login(){
        try{
          const res = await axios('https://apimarketapp.herokuapp.com/login',{
            method: 'POST',
            data: this.login
          })
          //almacenando el token en el localstorage
          await localStorage.setItem('token',res.data.token)
          
          //almacenando el token en el store
          this.SetToken(res.data.token)

          this.openNotification('top-right','success','Login',res.data.data, ' bienvenido')

          this.login = {
            email: '',
            password:''
          }

            this.activelogin = false
        }catch(err){
          this.openNotification('top-right','danger', 'Login', 'Credenciales incorrectas', '')
        }
      },
      openNotification(position = null, color, title, texto , comp) {
        this.$vs.notification({
          color,
          position,
          title,
          text: texto + comp
        })
      },
      ...mapActions(['SetToken']),
    },
}
</script>

<style>

</style>