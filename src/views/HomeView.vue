<template>
    <div>
        homepage:{{ homepage }}用类生成对象
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const homepage = ref('home')
</script>