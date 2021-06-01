<template>
    <vs-sidebar
        absolute
        hover-expand
        reduce
        v-model="active"
        open
    >
        <vs-sidebar-item id="home" to="/">
            <template #icon>
            <i class='bx bx-home'></i>
            </template>
            Inicio
        </vs-sidebar-item>
        <vs-sidebar-item id="market" to="/tienda">
            <template #icon>
            <i class='bx bx-grid-alt'></i>
            </template>
            Tienda
        </vs-sidebar-item>
        <vs-sidebar-item id="cart" to="/carrito">
            <template #icon>
                <vs-avatar badge badge-color="danger">
                    <i class='bx bx-cart-alt' ></i>
                    <template #badge>
                    {{cancarrito}}
                    </template>
                </vs-avatar>
            </template>
            Carrito
        </vs-sidebar-item>
        <vs-sidebar-group>
            <template #header>
            <vs-sidebar-item arrow>
                <template #icon>
                <i class='bx bx-group'></i>
                </template>
                Contacto
            </vs-sidebar-item>
            </template>

            <vs-sidebar-item id="Instagram">
            <template #icon>
                <i class='bx bxl-instagram'></i>
            </template>
            Instagram
            </vs-sidebar-item>
            <vs-sidebar-item id="twitter">
            <template #icon>
                <i class='bx bxl-twitter' ></i>
            </template>
            Twitter
            </vs-sidebar-item>
            <vs-sidebar-item id="Facebook" >
            <template #icon>
                <i class='bx bxl-facebook' ></i>
            </template>
            Facebook
            </vs-sidebar-item>
        </vs-sidebar-group>
        
        <template #footer>
            <vs-row v-if="!token" justify="center">
                <vs-avatar badge-color="danger" badge-position="top-right" @click="ChangeActive()">
                    <i class='bx bx-user'></i>
                </vs-avatar>
            </vs-row>
            <vs-row v-else justify="space-between">
                <vs-button shadow size="xl" @click="Signoff()">
                    <i class='bx bx-exit' ></i>
                </vs-button>
                <vs-avatar>
                    <img :src="'https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'" alt="">
                </vs-avatar>
            </vs-row>
        </template>
    </vs-sidebar>
</template>

<script>
import { inject } from '@nuxtjs/composition-api';
import {mapState,mapActions} from 'vuex'

export default {
    props:['cancarrito'],
    setup() {
        const active = 'home';
        const activelogin = inject('active')
        return{
            active,
            activelogin
        }
    },
    computed:{
        ...mapState(['token','user']),
    },
    methods: {
        ChangeActive(){
            this.activelogin = !this.activelogin
        },
        ...mapActions(['Signoff']),
    },
}
</script>

<style>

</style>