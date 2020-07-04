<template>
  <div class="container">
    <div>
      <h1>About</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'About Page?',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Really the about page',
        },
      ],
    }
  },
  asyncData() {
    return { pageTitle: 'About!!' }
  },
  data() {
    return {
      pageTitle: '',
    }
  },
}
</script>
