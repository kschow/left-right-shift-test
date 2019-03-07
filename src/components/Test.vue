<template>
    <div>
        <div class="text type passage">
            <span v-html="rawHtmlText"></span>
        </div>
        <textarea
            v-bind:value="userInput"
            v-on:keyup="$emit('trackKeyup', $event)"
            v-on:input="$emit('input', $event.target.value)"
            placeholder="Start typing here..."
            rows="8" cols="80" class="text"
            spellcheck="false"></textarea>
        <button @click="$emit('finish')">
            Finish Typing
        </button>
    </div>
</template>

<script>
    export default {
        name: "Test",
        props: [
            'rawHtmlText',
            'userInput'
        ]
    }
</script>

<style scoped>

</style>