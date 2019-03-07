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
        rightShiftsNumber } from '../utility'

    let diff = require('diff')

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
                text: '"There, just at your feet; don\'t be so nervous, girl!" cried Mrs Rose.\nMatty, in her anxiety not to drop the match, at once dropped it into the waste-paper basket, which was instantly alight. A stamp of the foot might have extinguished it, but this did not occur to either of the domestics. The housekeeper, who was a courageous woman, seized the basket in both hands and rushed with it to the fireplace, thereby fanning the flame into a blaze and endangering her dress and curls. She succeeded, however, in cramming the basket and its contents into the grate; then the two, with the aid of poker, tongs, and shovel, crushed and beat out the fire.\n"There! I said you\'d do it," gasped Mrs Rose, as she flung herself, panting, into Mr Auberly\'s easy-chair; "this comes of bein\' in a hurry."',
                rawHtmlText: '<p>"There, just at your feet; don\'t be so nervous, girl!" cried Mrs Rose.</p><p>Matty, in her anxiety not to drop the match, at once dropped it into the waste-paper basket, which was instantly alight. A stamp of the foot might have extinguished it, but this did not occur to either of the domestics. The housekeeper, who was a courageous woman, seized the basket in both hands and rushed with it to the fireplace, thereby fanning the flame into a blaze and endangering her dress and curls. She succeeded, however, in cramming the basket and its contents into the grate; then the two, with the aid of poker, tongs, and shovel, crushed and beat out the fire.</p><p>"There! I said you\'d do it," gasped Mrs Rose, as she flung herself, panting, into Mr Auberly\'s easy-chair; "this comes of bein\' in a hurry."</p>',
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