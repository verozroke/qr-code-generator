<template>
  <div>
    <ToastProvider />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import ToastProvider from './providers/ToastProvider.vue';



</script>


<style lang="scss">
html,
body {
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 13px;
  background-color: transparent;

  &-track {
    background-color: transparent;
    margin-block: .5em;
  }

  &-thumb {
    background-color: rgba(47, 47, 47, 0.836);
    border-radius: 100vw;
    transition: .4s;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;

    &:hover {
      background-color: rgb(28, 28, 28);
      transition: .4s;
    }
  }

}
</style>