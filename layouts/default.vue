<script setup>
import { ref } from 'vue';

const items = ref([
  {
    label: 'Random Article',
  },
  {
    label: 'About',
  }
]);

const { generate } = useCompletion()

const searchText = ref('')

const generateContent = async () => {
  await generate(searchText.value)
}

const route = useRoute()
onMounted(async () => {
  if (route.query.search) {
    await generate(route.query.search)
  }
})
</script>

<template>
  <div class="default">
    <header>
      <div class="card">
        <Menubar :model="items">

          <template #end>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="searchText" @keydown.enter="generateContent" placeholder="Search" />
            </span>
          </template>
        </Menubar>
      </div>
    </header>

    <div class="content">
      <div class="sidebar">
        <sidebar></sidebar>
      </div>

      <div class="main-content">
        <slot />
      </div>

      <div class="sidebar">
        <!-- Right Sidebar -->
      </div>
    </div>

    <footer>

    </footer>
  </div>
</template>

<style scoped>
/* Basic CSS for layout */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
footer {
  padding: 10px;
  text-align: center;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 25vw;
  padding: 5px;
}

.main-content {
  flex-grow: 1;
  padding: 10px;
}

::v-deep .p-menubar-root-list {
  margin-left: auto;
  margin-right: 10px;
}

::v-deep .p-menubar .p-menubar-end {
  margin-left: 0;
}
</style>
