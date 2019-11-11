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
} from '@material-ui/core/colors';

const colors = [red, green, blue, cyan, indigo, amber, blueGrey, brown, yellow, orange, deepOrange, grey, deepPurple, lightBlue, lightGreen, lime, pink, purple, teal, common];

function* generatorColor() {
    const newColor = [...colors];

    while (true) {
        if (!newColor.length) {
            newColor.push(...colors);
        }
        yield newColor.shift();
    }
}

export default generatorColor();