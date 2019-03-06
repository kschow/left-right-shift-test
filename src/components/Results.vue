<template>
    <div>
        <div class="text type passage">
            <h4>Expected:</h4>
            <ul>
                <li>Number of times left shift was used: {{expectedLeftShifts}}</li>
                <li>Number of times right shift was used: {{expectedRightShifts}}</li>
                <li>Number of times any shift was used: {{expectedTotalShifts}}</li>
            </ul>
            <h4>Results:</h4>
            <ul>
                <li>Number of times left shift was used: {{leftShifts}}</li>
                <li>Number of times right shift was used: {{rightShifts}}</li>
                <li>Number of times any shift was used: {{totalShifts}}</li>
                <li>Number of times backspace was used: {{backspaces}}</li>
                <li>Diff: <span v-html="differenceString"></span></li>
            </ul>
        </div>
        <button @click="$emit('restart')">Restart Test?</button>&nbsp;
        <a href="#" @click="$emit('backToBegin')">Go Back to the Beginning</a>
    </div>
</template>

<script>
    export default {
        name: "Results",
        props:[
            'leftShifts',
            'rightShifts',
            'otherShifts',
            'totalShifts',
            'expectedLeftShifts',
            'expectedRightShifts',
            'expectedTotalShifts',
            'backspaces',
            'differences'
        ],
        computed: {
            differenceString: function() {
                let diffString = ''
                this.differences.forEach(function(part) {
                    let color = part.added ? 'green' :
                        part.removed ? 'red' : 'grey'
                    diffString += `<span class="${color}">${part.value}</span>`
                })
                return diffString
            }
        }
    }
</script>

<style scoped>
</style>