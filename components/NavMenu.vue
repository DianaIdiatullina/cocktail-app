<template>
  <nav class="nav-menu">
    <ul>
      <li
        v-for="code in cocktailCodes"
        :key="code"
      >
        <NuxtLink
          :to="`/${code}`"
          :class="{ active: $route.params.cocktail === code }"
          class="nav-menu__title"
        >
          {{ code }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const cocktailCodes = ['margarita', 'mojito', 'a1', 'kir']

import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped lang="scss">
.nav-menu {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 8px;

    &:hover {
      background-color: #E1F5FE;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
    text-transform: capitalize;
  }
  a.active {
    font-weight: bold;
    color: #4DD0E1;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    border-bottom: 1px solid gray;
  }
}
</style>
