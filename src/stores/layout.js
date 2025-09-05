import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: 'AppLayout',
  }),

  getters: {
    getLayout: (state) => state.layout,
  },

  actions: {
    setLayout(newLayout) {
      this.layout = newLayout
    },
  },
})
