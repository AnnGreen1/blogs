<template>
    <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item>
                <!-- <el-avatar style="width: 100px;height:100px;" src="@/assets/anngreen.jpeg" alt="Element logo" /> -->
                <!-- <img style="width: 50px;height:50px;" src="@/assets/anngreen.jpeg" alt=""> -->
                用类生成对象
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">文章</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
  
<style lang="scss">
.navbar {
    img {
        border-radius: 50%;
    }

    .flex-grow {
        flex-grow: 1;
    }
}
</style>
  