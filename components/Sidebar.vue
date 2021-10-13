<template>
  <vs-sidebar absolute hover-expand reduce open>
    <vs-sidebar-item :class="this.$route.path==='/' ? 'active' : ''" id="home" to="/">
      <template #icon>
        <i class="bx bx-home"></i>
      </template>
      Inicio
    </vs-sidebar-item>
    <vs-sidebar-item :class="this.$route.path==='/tienda' ? 'active' : ''" id="market" to="/tienda">
      <template #icon>
        <i class="bx bx-grid-alt"></i>
      </template>
      Tienda
    </vs-sidebar-item>
    <vs-sidebar-item v-if="Active" :class="this.$route.path==='/mis_compras' ? 'active' : ''" id="shopping" to="/mis_compras">
      <template #icon>
        <i class="bx bx-shopping-bag"></i>
      </template>
      Mis Compras
    </vs-sidebar-item>
    <vs-sidebar-item :class="this.$route.path==='/carrito' ? 'active' : ''" id="cart" to="/carrito">
      <template #icon>
        <vs-avatar badge badge-color="danger">
          <i class="bx bx-cart-alt"></i>
          <template #badge>
            {{ cancarrito }}
          </template>
        </vs-avatar>
      </template>
      Carrito
    </vs-sidebar-item>
    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class="bx bx-group"></i>
          </template>
          Contacto
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item id="Instagram">
        <template #icon>
          <i class="bx bxl-instagram"></i>
        </template>
        Instagram
      </vs-sidebar-item>
      <vs-sidebar-item id="twitter">
        <template #icon>
          <i class="bx bxl-twitter"></i>
        </template>
        Twitter
      </vs-sidebar-item>
      <vs-sidebar-item id="Facebook">
        <template #icon>
          <i class="bx bxl-facebook"></i>
        </template>
        Facebook
      </vs-sidebar-item>
    </vs-sidebar-group>
    <template #footer>
      <vs-row v-if="!Active" justify="center">
        <vs-avatar
          badge-color="danger"
          badge-position="top-right"
          @click="ChangeActive()"
        >
          <i class="bx bx-user"></i>
        </vs-avatar>
      </vs-row>
      <vs-row v-else justify="space-between">
        <vs-button shadow size="xl" @click="Signoff()">
          <i class="bx bx-exit"></i>
        </vs-button>
        <vs-avatar v-if="user">
          <img
            :src="user.avatar"
            alt=""
          />
        </vs-avatar>
      </vs-row>
    </template>
  </vs-sidebar>
</template>
<script>
import { inject } from "@nuxtjs/composition-api";
import { mapState, mapActions,mapGetters } from "vuex";

export default {
  props: ["cancarrito"],
  setup() {
    const active = "home";
    const activelogin = inject("active");
    return {
      active,
      activelogin,
    };
  },
  computed: {
    ...mapState(["token", "user"]),
    ...mapGetters(['Active'])
  },
  methods: {
    ChangeActive() {
      this.activelogin = !this.activelogin;
    },
    ...mapActions(["Signoff"]),
  },
};
</script>

<style>
.vs-avatar img{
  height: 100% !important;
}
</style>