<script setup>
import { ref } from 'vue';

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt',
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
          },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  },
]);
</script>

<template>
  <div class="default">
    <header>
      <div class="card">
        <Menubar :model="items" />
      </div>
    </header>

    <div class="content">
      <div class="sidebar">
        <!-- Left Sidebar -->
        <h2>Left Sidebar</h2>
        <p>Some content here...</p>
      </div>

      <div class="main-content">
        <!-- Main Content -->
        <h2>Main Content</h2>
        <slot />
      </div>

      <div class="sidebar">
        <!-- Right Sidebar -->
        <h2>Right Sidebar</h2>
        <p>Some content here...</p>
      </div>
    </div>

    <footer>
      <h2>Your Footer</h2>
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
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}
.content {
  display: flex;
  flex: 1;
}
.sidebar {
  background-color: #ddd;
  padding: 10px;
  width: 200px;
}
.main-content {
  flex-grow: 1;
  padding: 10px;
  background-color: #f9f9f9;
}
</style>
