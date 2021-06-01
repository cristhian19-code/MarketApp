<template>
    <vs-alert dark shadow :hidden-content.sync="hidden">
        <template #title>
            <vs-avatar>
                <img :src="avatar" alt="">
            </vs-avatar>
            <p>{{name}}</p>
        </template>
        {{description}}
    </vs-alert>
</template>

<script>
export default {
    data() {
        return {
            hidden: true
        }
    },
    props:{
        avatar: String,
        name: String,
        description: String,
    }
}
</script>

<style>

</style>