<template>
  <div class="comments">
    <vs-dialog full-screen overflow-hidden auto-width v-model="activeComment">
      <template #header>
        <h3>Comentarios</h3>
      </template>
      <div class="container-comments">
        <CommentVue
          v-for="(comment, index) in comments"
          :key="index"
          :avatar="comment.avatar"
          :name="comment.name"
          :description="comment.comment"
        />
      </div>
      <template #footer>
        <vs-input
          type="text"
          placeholder="Deje su comentario"
          v-model="comment"
          class="input-comment"
          state="primary"
          border
        />
        <vs-button color="dark" @click="Comment()">Enviar</vs-button>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";
import CommentVue from "./Comment.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  setup() {
    const activeComment = inject("activeComment");
    const comment = "";
    return {
      activeComment,
      comment,
    };
  },

  props: {
    comments: Array,
    id: String,
  },
  components: {
    CommentVue,
  },
  computed: {
    ...mapState(["user", "token"]),
  },
  methods: {
    async Comment() {
      const res = await axios("http://localhost:5000/comment", {
        method: "POST",
        data: {
          comment: this.comment,
          _id: this.id,
          id_user: this.user.id,
          email: this.user.email,
        },
        headers: {
          "auth-token": this.token,
        },
      });

      if (!res.data.error) {
        this.openNotification(
          "top-right",
          "success",
          "Comentario",
          res.data.message
        );
      } else {
        this.openNotification(
          "top-right",
          "error",
          "Comentario",
          res.data.message
        );
      }
    },
    openNotification(position = null, color, title, texto) {
      this.$vs.notification({
        color,
        position,
        title,
        text: texto,
      });
    },
  },
};
</script>

<style>
.vs-dialog__footer {
  display: flex;
}

.vs-alert {
  margin: 10px 0;
  border-radius: 5px;
}

.input-comment {
  width: 95vw;
}

input[type="text"] {
  width: 90%;
}

.container-comments {
  height: 76vh;
  overflow-y: scroll;
}

.container-comments::-webkit-scrollbar {
  width: 7px;
}
.container-comments::-webkit-scrollbar-button {
  display: none;
}
.container-comments::-webkit-scrollbar-corner {
  background: black;
}
.container-comments::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 5px;
}
</style>