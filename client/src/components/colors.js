import {
    red,
    green,
    blue,
    cyan,
    indigo,
    amber,
    blueGrey,
    brown,
    yellow,
    orange,
    deepOrange,
    grey,
    deepPurple,
    lightBlue,
    lightGreen,
    lime,
    pink,
    purple,
    teal,
    common
} from "@material-ui/core/colors";

const colors = [red, green, blue, cyan, indigo, amber, blueGrey, brown, yellow, orange, deepOrange, grey, deepPurple, lightBlue, lightGreen, lime, pink, purple, teal, common];
export default colors;

function* generatorColor() {
    let index = 0;
    while (true) {
        if (colors.length - 1 < index) index = 0;
        yield index++;
    }
}

export const colorsIndex = generatorColor();