<script setup>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
const html = ref('');

const { onCompleteContent } = useCompletion()

onCompleteContent(text => {
  if (text) {
    html.value = md.render(text);
  }
})

</script>

<template>
  <div :key="'test'" v-html="html"></div>
</template>
