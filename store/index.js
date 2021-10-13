import axios from "axios";

export const state = () => ({
    carrito: [],
    total: 0,
    token: '',
    user: null
})

export const mutations = {
    Add(state, product) {
        state.carrito.push(product);
        state.total = 0;
        state.carrito.forEach(element => {
            state.total += (element.price * element.cant);
        });

        state.total = state.total.toFixed(1)
    },
    Delete(state, index) {
        state.total -= (state.carrito[index].price * state.carrito[index].cant);
        state.total = state.total.toFixed(1)
        state.carrito.splice(index, 1)
    },
    Edit(state, edit) {
        state.carrito[edit.index].cant = edit.cantidad;

        state.total = 0;
        state.carrito.forEach(element => {
            state.total += (element.price * element.cant);
        });

        state.total = state.total.toFixed(1)
    },
    setCarrito(state,carrito){
        state.carrito = carrito
    },
    Clean(state) {
        state.carrito = [];
        state.total = 0;
    },
    Set(state, { token, user }) {
        state.token = token
        state.user = user
    }
}
export const actions = {
    AddProduct({ commit, state }, product) {
        if (product.cant && product.cant > 0) {
            const filter = state.carrito.filter( prod => prod.name === product.name);

            if(filter.length === 1){
                const carrito = state.carrito.map(prod => prod.name === product.name ? {...prod, cant: prod.cant+product.cant} : prod);
                commit('setCarrito',carrito)
            }else{
                commit('Add', product);
            }
        }
    },
    RemoveProduct({ commit }, index) {
        commit('Delete', index)
    },
    EditProduct({ commit }, edit) {
        if (edit.cantidad && edit.cantidad > 0) {
            commit('Edit', edit)
        }
    },
    CleanTrolley({ commit }) {
        commit('Clean')
    },
    async SetToken({ commit }, token) {

        try {
            const res = await axios('http://localhost:5000/acceso', {
                method: 'POST',
                headers: {
                    'auth-token': token
                }
            })
            const user = res.data.data;

            commit('Set', { token, user })
        } catch (error) {
            commit('Set', { token: null, user: null })
        }
    },
    async Signoff({ commit }) {
        await localStorage.removeItem('token')
        commit('Set', { token: null, user: null })
    }
}

export const getters = {
    Active(state){
        if(state.user){
            return true
        }
        return false
    }
}