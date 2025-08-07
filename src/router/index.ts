import { createRouter, createWebHistory } from "vue-router";
import CharactersView from "../views/CharactersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Characters",
      component: CharactersView,
    },
    {
      path: "/character/:id",
      name: "CharacterDetail",
      component: () => import("../views/CharacterDetailView.vue"),
    },
    {
      path: "/favorites",
      name: "Favourites",
      component: () => import("../views/FavouritesView.vue"),
    },
  ],
});

export default router;
