<template>
  <div v-if="user" class="compras">
    <vs-table v-for="(compra, index) in compras" :key="index">
      <template #thead>
        <vs-tr>
          <vs-th> {{ compra.date }} </vs-th>
          <vs-th> Nombre </vs-th>
          <vs-th> Precio </vs-th>
          <vs-th> Cantidad </vs-th>
          <vs-th> Subtotal </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(producto, i) in compra.productos">
          <vs-td></vs-td>
          <vs-td> {{ producto.name }}</vs-td>
          <vs-td>
            S/.{{ producto.price }}
          </vs-td>
          <vs-td>
            {{ producto.cant }}
          </vs-td>
          <vs-td>
            S/.{{ (producto.price * producto.cant).toFixed(1) }}
          </vs-td>
        </vs-tr>
      </template>
      <vs-row justify="flex-end">
        <h2 class="total">Total: S/. {{ compra }}</h2>
      </vs-row>
    </vs-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      compras: [],
    };
  },
  watch: {
    user: function (newUser, oldUser) {
      this.getShopping();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async getShopping() {
      if(this.user){
        const compras = await axios("http://localhost:5000/mis-compras", {
          method: "POST",
          data: {
            id: this.user.id,
          },
        });
        this.compras = compras.data.data;
      }
    },
  },
  created() {
    this.getShopping();
  },
};
</script>

<style>
.compras {
  padding: 25px 25px 25px 70px;
}
</style>