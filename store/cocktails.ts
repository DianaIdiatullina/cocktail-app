import { defineStore } from 'pinia'
import axios from 'axios'

interface Cocktail {
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  ingredients: Array<{ measure: string; ingredient: string }>
}

export const useCocktailStore = defineStore('cocktails', {
  state: () => ({
    cocktails: {} as Record<string, Cocktail>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCocktail(cocktailCode: string) {
      if (this.cocktails[cocktailCode]) {
        // Если данные уже загружены, ничего не делаем
        return
      }

      this.loading = true
      this.error = null

      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailCode}`
        )

        const data = response.data.drinks[0]

        // Сохраняем данные в формате, удобном для отображения
        this.cocktails[cocktailCode] = {
          strDrink: data.strDrink,
          strCategory: data.strCategory,
          strAlcoholic: data.strAlcoholic,
          strGlass: data.strGlass,
          strInstructions: data.strInstructions,
          strDrinkThumb: data.strDrinkThumb,
          ingredients: Array.from({ length: 15 }, (_, i) => ({
            measure: data[`strMeasure${i + 1}`],
            ingredient: data[`strIngredient${i + 1}`],
          })).filter((item) => item.ingredient), // Удаляем пустые ингредиенты
        }
      } catch (error) {
        this.error = 'Failed to load cocktail data'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
