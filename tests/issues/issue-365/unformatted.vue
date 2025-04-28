<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template lang="pug">
n-input(:ref="(el:any)=>pinRefs[index]=el", @change="(val:string)=>val")
</template>
