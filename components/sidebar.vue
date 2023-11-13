<script setup>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
const html = ref('');

const { onCompleteSidebar } = useCompletion()

onCompleteSidebar((text) => {
  if (text) {
    html.value = md.render(text.replaceAll(/-\s+(.*)/g, (match, p1) => `- [${p1}](/?search=${encodeURIComponent(p1)})`));
  }
})
</script>

<template>
  <div class="card flex justify-content-center sidebar">
    <Panel header="Similar Topics">

      <div v-if="html" v-html="html"></div>

    </Panel>
  </div>
</template>

