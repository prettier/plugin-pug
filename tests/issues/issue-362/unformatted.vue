<template lang="pug">
section.Specimen(
  v-if=" typeface.specimen.image",
   v-lazy-container="{  selector :  'img'  }")
</template>
