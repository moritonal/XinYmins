import { storiesOf } from '@storybook/vue';
import {
    withKnobs,
    text,
    number,
    boolean,
    array,
    select,
    color,
    date,
    button,
  } from '@storybook/addon-knobs';

import SpinnerComponent from './../Spinner.vue';
import moment from "moment"

storiesOf('Spinner Component', module)
    .addDecorator(withKnobs)
    .add('Sandbox', () => {

        let colour = text("Colour", "pink");

        let luminosity = select("Chunk Luminosity", {
            "Bright": "bright", "Light": "light", "Dark": "dark"
        }, "Bright");

        let numberOfChunks = number("Number of Chunks", 5);

        let chunks = [];
        for (let i=0; i < numberOfChunks; i++)
            chunks.push({});

        let timeStart = date("Time Start", new Date(moment(0).valueOf()));
        let timeNow = date("Time Now", new Date(moment(0).add(1.5, "minute").valueOf()));
        let timeEnd = date("Time End", new Date(moment(0).add(12, "minute").valueOf()));

        let innerRadiusPercentage = number("Radius Percentage", 0.3);
        let chunkPadding = number("Chunk Padding", 5);
        let chunkStroke = number("Chunk Stroke", 10);

        let progressColour = text("Progress Colour");

        return {
            components: { SpinnerComponent },
            data() {
                return {
                    "tasks": chunks,
                    "timeStart": moment.unix(timeStart),
                    "timeNow": moment.unix(timeNow),
                    "timeEnd": moment.unix(timeEnd),
                }
            },
            template: `<spinner-component 
                v-bind:tasks="tasks" 
                :timeStart="timeStart" 
                :timeNow="timeNow" 
                :timeEnd="timeEnd"
                progress-colour="${progressColour}"
                inner-radius-percentage="${innerRadiusPercentage}"
                chunk-stroke="${chunkStroke}"
                chunk-padding="${chunkPadding}"
                chunk-colour="${colour}"
                chunk-luminosity="${luminosity}">
            </spinner-component>`
        }
    });