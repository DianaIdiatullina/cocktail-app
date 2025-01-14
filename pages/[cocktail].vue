<template>
  <div class="container">
    <aside>
      <NavMenu />
    </aside>

    <main>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <div
        v-else-if="cocktail"
        class="cocktail"
      >
        <div class="cocktail__info">
          <p class="cocktail__title">{{ cocktail.strDrink }}</p>
          <p>{{ cocktail.strCategory }}</p>
          <p>{{ cocktail.strAlcoholic }}</p>
          <p>{{ cocktail.strGlass }}</p>
          <p>Instructions: {{ cocktail.strInstructions }}</p>
          <ul>
            <li v-for="item in cocktail.ingredients" :key="item.ingredient">
              {{ item.measure }} {{ item.ingredient }}
            </li>
          </ul>
        </div>
        <div class="cocktail__image-col">
          <img :src="cocktail.strDrinkThumb" alt="Drink Image" loading="lazy" class="cocktail__image"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCocktailStore } from '~/store/cocktails'
import { computed, onMounted } from 'vue'

const store = useCocktailStore()
const route = useRoute()

onMounted(() => {
  store.fetchCocktail(route.params.cocktail)
})

const cocktail = computed(() => store.cocktails[route.params.cocktail])
const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>

<style scoped lang="scss">
.container {
  display: flex;
  padding: 20px;
}

aside {
  width: 20%;
}

main {
  width: 80%;
  padding: 0 40px;
}

.cocktail {
  display: flex;

  &__info {
    padding-right: 30px;
  }

  &__title {
    font-size: 30px;
    font-weight: bold;
    margin-top: 0;
  }

  &__image-col {
    width: 50%;
  }

  &__image {
    object-fit: contain;
    max-width: 400px;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 8px;
  }

  aside {
    max-width: 100%;
    width: 100%;
    padding: 0 16px 30px 16px;
  }

  main {
    width: 100%;
    padding: 0 16px;
  }

  .cocktail {
    flex-direction: column-reverse;

    &__image-col {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 20px 0;
    }

    &__image {
      max-width: 250px;
      height: 100%;
    }
  }
}
</style>
