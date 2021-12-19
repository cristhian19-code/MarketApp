<template>
  <div class="grid">
    <CardProductVue v-for="(item,index) in items" :key="index" :url="item.url" :name="item.name" :price="item.price" :comments="item.comments" :measurement="item.measurement" :id="item._id"/>
  </div>
</template>

<script>
import CardProductVue from '../../components/CardProduct.vue'

import axios from 'axios'

export default {
    data() {
        return {
           items: [] 
        }
    },
    components:{
        CardProductVue
    },
    async created(){

        //mandar peticion al store para reutilizar al enviar commentarios y se refresque los comentario con el cambio
        const items = await axios('https://apimarketapp.herokuapp.com/allproducts',{
            method: 'GET'
        })
        this.items = items.data.data
    }
}
</script>

<style>
.grid{
    padding: 25px 70px;
    display: flex;
    justify-content: center;
    grid-gap: 20px;
    flex-wrap: wrap;
    height: 100vh;
    overflow-y: scroll;
}
</style>