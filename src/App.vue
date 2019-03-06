<template>
    <div id="app">
        <Main />
    </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
    name: 'app',
    components: {
        Main
    }
}
</script>

<style>
    body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        background-color: #dfdfdf;
        padding: 1em;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
