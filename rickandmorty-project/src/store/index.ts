// store.ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// define your typings for the store state
export interface State {
  data: Array<any>;
  lisFav: Array<any>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  state: {
    data: [],
    listFav: [],
  },
  actions: {
    addListApi({ commit }, data) {
      commit("SETADDLISTAPI", data);
    },
  },
  mutations: {
    SETADDLISTAPI(state, payload) {
      const list = payload;      

      const save = [];
      var init = 0;
      var end = 5;
      let cantCards = 5;
      for (let i = 0; i < list.length / cantCards; i++) {
        save[i] = list.slice(init, end);
        init = end;
        end = end + cantCards;
      }

      state.data = save;
    },
  },
  getters: {
    getData: (state) => state.data
  }
});
