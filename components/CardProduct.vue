<template>
   <div>
        <vs-card type="1">
                <template #title>
                <h3>{{name}} </h3>
                </template>
                
                <template #img>
                    <img class="img-card" :src="url" alt="">
                </template>
            <template #text>
                <h3>
                    S/. {{price}} {{measurement}}
                </h3>
            </template>
            <template #interactions>
                <vs-button success icon @click="AddProduct({name,price,url,cant,measurement})">
                    <i class='bx bx-plus'></i>
                </vs-button>
                <vs-input
                    type="number"
                    v-model="cant"
                    max="50"
                    min="0"
                />
                <vs-button class="btn-chat" shadow primary @click="activeComment = !activeComment">
                    <i class='bx bx-chat' ></i>
                    <span class="span">
                    {{comments.length}}
                    </span>
                </vs-button>
            </template>
        </vs-card>
        <DialogCommentsVue :id="id" :comments="comments"/>
   </div>
</template>

<script>
import DialogCommentsVue from './DialogComments.vue'
import {mapActions} from 'vuex'
import { provide, ref } from '@nuxtjs/composition-api';
export default {
    props:{
        price: Number,
        url: String,
        name: String,
        comments: Array,
        measurement: String,
        id: String
    },
    components:{
        DialogCommentsVue
    },
    setup() {
        const cant=0;

        const activeComment = ref(false);
        provide('activeComment',activeComment);

        return {
            cant,
            activeComment
        }
    },
    methods: {
        ...mapActions(['AddProduct']),
    },
}
</script>

<style>

input[type="number"] {
    width: 100px;
}
</style>