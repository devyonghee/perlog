import {red, green, blue, cyan, indigo, amber, blueGrey, brown, yellow, orange} from "@material-ui/core/colors";

const colors = [[red, blue], [green, amber], [cyan, orange], [yellow, blueGrey], [brown, indigo]];
export default colors;

function* generatorColor() {
    let index = 0;
    while (true) {
        if (colors.length - 1 < index) index = 0;
        yield index++;
    }
}

export const colorsIndex = generatorColor();