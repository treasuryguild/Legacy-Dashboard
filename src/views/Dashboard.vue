<script setup>
import { useStore } from '../store/index'

const store = useStore()
</script>
<template>
    <div>
        Dashboard
        {{ store.name }}
        {{ store.number }}
    </div>
</template>