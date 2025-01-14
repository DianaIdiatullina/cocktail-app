<template>
  <div>
    <h1>Welcome to Cocktail App</h1>
    <p>Redirecting to Margarita...</p>
  </div>
</template>

<script setup>
const router = useRouter()
onMounted(() => {
  router.push('/margarita')
})
</script>
