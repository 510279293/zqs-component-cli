<template>
  <div class="about">
    <div v-for="(item, idx) in imgArrs" :key="idx">
      <checkbox :disabled="disabledArr.includes(item.id)" />
      <img />
    </div>
  </div>
</template>
<script>
const imgArrs = [
  {
    id: '1',
    src: 'xxxxx'
  },
  {
    id: '1',
    src: 'xxxxx'
  },
  {
    id: '1',
    src: 'xxxxx'
  },
  {
    id: '1',
    src: 'xxxxx'
  }
]
export default {
  props: {
    disabledArr: {
      default: [1, 2, 3]
    }
  },
  data: () => ({
    imgArrs,
  })
}
</script>
