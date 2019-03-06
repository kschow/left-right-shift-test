<template>
    <div>
        <div class="text passage">
            <p>This is a simple typing test that does a few very simple things:</p>
            <ol>
                <li>Tracks how many times you use the left shift key vs. the right shift key.</li>
                <li>Tracks how many times you use the backspace key.</li>
                <li>How correctly you type. This is shown as a word by word diff.
                    Grey text is the same, red is removed from the original, and green is added.</li>
            </ol>
            <p>Like most typing tests, you'll get a passage of text to type and a text box to type in. When done, click the "Finish Typing" button to see your results.</p>
        </div>
        <button @click="$emit('start')">Get started</button>
    </div>
</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>

</style>