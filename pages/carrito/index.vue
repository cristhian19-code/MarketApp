<template>
  <div>
    <div class="center">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th> Imagen </vs-th>
            <vs-th> Cantidad </vs-th>
            <vs-th> Precio </vs-th>
            <vs-th> Producto </vs-th>
            <vs-th> Subtotal </vs-th>
            <vs-th> Opciones </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(producto, i) in carrito">
            <vs-td>
              <vs-avatar>
                <img :src="producto.url" alt="" />
              </vs-avatar>
            </vs-td>
            <vs-td> {{ producto.cant }} {{ producto.measurement }} </vs-td>
            <vs-td>
              S/.{{ producto.price }}
            </vs-td>
            <vs-td>
              {{ producto.name }}
            </vs-td>
            <vs-td>
              S/.{{ (producto.price * producto.cant).toFixed(1) }}
            </vs-td>
            <vs-td class="buttons">
              <vs-button flat icon @click="Active(i)"> Editar </vs-button>
              <vs-button border danger @click="RemoveProduct(i)">
                Remover
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-row justify="flex-end">
        <h2 class="total">Total: S/. {{ total }}</h2>
      </vs-row>

      <vs-row v-if="total != 0" justify="center">
        <vs-button dark @click="Purchase()"
          ><i class="bx bx-shopping-bag"></i>
          <h3>Comprar</h3></vs-button
        >
      </vs-row>
    </div>

    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">
          <b>Editar Cantidad</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input
          min="0"
          max="50"
          type="number"
          v-model="cantidad"
          placeholder="cantidad"
        >
          <template #icon> # </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="Edit()"> Editar </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState(["carrito", "total", "user", "token"]),
  },
  data() {
    return {
      active: false,
      cantidad: "",
      index: 0,
    };
  },
  methods: {
    Active(index) {
      this.active = !this.active;
      this.index = index;
    },
    Edit() {
      this.EditProduct({
        cantidad: this.cantidad,
        index: this.index,
      });
      this.cantidad = 0;
      this.active = !this.active;
    },
    async Purchase() {
      //realizar la comprar y almacenar en la BD
      if (this.token) {
        try {
          await axios("https://apimarketapp.herokuapp.com/compra", {
            method: "POST",
            data: {
              productos: this.carrito,
              total: this.total,
              id: this.user.id,
            },
          }).data;

          this.CleanTrolley();
          this.openNotification(
            "top-right",
            "success",
            "Su compra se realizo de manera exitosa, Muchas gracias por su preferencia"
          );
        } catch (error) {
          this.openNotification("top-right", "danger", "Hubo un problema");
        }
      } else {
        this.openNotification("top-right", "danger", "Aun no inicias sesion");
      }
    },
    openNotification(position = null, color, message) {
      this.$vs.notification({
        color,
        position,
        title: "COMPRA",
        text: message,
      });
    },
    ...mapActions(["RemoveProduct", "EditProduct", "CleanTrolley"]),
  },
};
</script>

<style>
.center {
  padding: 25px 25px 25px 70px;
  overflow-y: scroll;
  height: 100vh;
}

.bx-shopping-bag {
  font-size: 20px;
}

.total {
  padding: 10px 20px;
}

h3 {
  margin: 2px 10px;
}

.buttons {
  display: flex;
  align-items: center;
}
.total {
  font-weight: 500;
  margin: 10px 0;
  text-align: center;
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