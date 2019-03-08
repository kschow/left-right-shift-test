<template>
    <div>
        <h2>Welcome to the Left/Right shift typing test</h2>
        <Info
            v-if="state === 0"
            v-on:start="start"/>
        <Test
            v-else-if="state === 1"
            v-bind:raw-html-text="rawHtmlText"
            v-bind:user-input="userInput"
            v-on:input="userInput = $event"
            v-bind:left-shifts="leftShifts"
            v-bind:right-shifts="rightShifts"
            v-bind:other-shifts="otherShifts"
            v-bind:backspaces="backspaces"
            v-on:trackKeyup="trackKeyup"
            v-on:finish="finish"/>
        <Results
            v-else
            v-bind:expected-left-shifts="expectedLeftShifts"
            v-bind:expected-right-shifts="expectedRightShifts"
            v-bind:expected-total-shifts="expectedTotalShifts"
            v-bind:left-shifts="leftShifts"
            v-bind:right-shifts="rightShifts"
            v-bind:other-shifts="otherShifts"
            v-bind:total-shifts="totalShifts"
            v-bind:backspaces="backspaces"
            v-bind:differences="differences"
            v-on:restart="restart"
            v-on:backToBegin="backToBegin"
            />
    </div>
</template>

<script>
    import Info from './Info'
    import Test from './Test'
    import Results from './Results'
    import { flattenText,
        leftShiftsNumber,
        rightShiftsNumber,
        breakText,
        italicizeText
    } from '../utility/utility'
    import { fightingTheFlames } from '../utility/fighting-the-flames'

    let diff = require('diff')
    let totalText = breakText(fightingTheFlames)

    function getText() {
        let index = Math.floor(Math.random() * totalText.length)

        let text = ''
        while (text.length < 500 && index < totalText.length) {
            text += (totalText[index++] + '\n')
        }

        return text
    }

    export default {
        name: "Main",
        components: {
            Info,
            Test,
            Results
        },
        data: function () {
            return {
                state: 0,
                text: getText(),
                userInput: '',
                leftShifts: 0,
                rightShifts: 0,
                otherShifts: 0,
                backspaces: 0,
            }
        },
        methods: {
            start: function() {
                this.state++
            },
            finish: function() {
                this.state++
            },
            restart: function() {
                this.leftShifts = 0
                this.rightShifts = 0
                this.otherShifts = 0
                this.backspaces = 0
                this.userInput = ''
                this.text = getText()
                this.state--
            },
            backToBegin: function() {
                this.restart()
                this.state = 0
            },
            trackKeyup: function(e) {
                if (e.key === 'Shift') {
                    if (e.location === 1) {
                        this.leftShifts++
                    } else if (e.location === 2) {
                        this.rightShifts++
                    } else {
                        this.otherShifts++
                    }
                } else if (e.key === 'Backspace') {
                    this.backspaces++
                }
            }
        },
        computed: {
            totalShifts: function() {
                return this.leftShifts + this.rightShifts + this.otherShifts
            },
            expectedLeftShifts: function() {
                return leftShiftsNumber(this.text)
            },
            expectedRightShifts: function() {
                return rightShiftsNumber(this.text)
            },
            expectedTotalShifts: function() {
                return this.expectedLeftShifts + this.expectedRightShifts
            },
            flatText: function() {
                return flattenText(this.text)
            },
            flatInput: function() {
                return flattenText(this.userInput)
            },
            differences: function() {
                return diff.diffWords(this.flatText, this.flatInput)
            },
            rawHtmlText: function() {
                return italicizeText(this.text)
            }
        }
    }
</script>

<style>
    .passage {
        max-width: 65em;
        margin: auto;
    }

    .type {
        text-align: left;
    }

    .text {
        background-color: #efefef;
        border-radius: 2px;
        border: 1px solid #333;
        padding: 1em;
    }

    ol {
        max-width: 30em;
        margin: auto;
    }

    li {
        text-align: left;
    }

    textarea {
        resize: none;
        margin-top: 1.25em;
    }

    button {
        display: block;
        margin: 1em auto auto;
    }


    span.green {
        color: green;
    }

    span.red {
        color: red;
    }

    span.grey {
        color: grey;
    }
</style>