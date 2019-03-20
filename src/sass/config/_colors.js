const hexToRgb = input => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
        let first = input[0];
        let second = input[1];
        let last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return (
        parseInt(first, 16) +
        ", " +
        parseInt(second, 16) +
        ", " +
        parseInt(last, 16)
    );
};

const PRIMARY_COLOR = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5"];
const WARNING_COLOR = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
const DANGER_COLOR = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
const SUCCESS_COLOR = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
const INFO_COLOR = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
const ROSE_COLOR = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
const GRAY_COLOR = ["#999", "#777", "#3C4858", "#AAAAAA", "#D2D2D2", "#DDD", "#b4b4b4", "#555555", "#333", "#a9afbb", "#eee", "#e7e7e7"];
const BLACK_COLOR = "#000";
const WHITE_COLOR = "#FFF";

export {
    hexToRgb,
    PRIMARY_COLOR,
    WARNING_COLOR,
    DANGER_COLOR,
    SUCCESS_COLOR,
    INFO_COLOR,
    ROSE_COLOR,
    GRAY_COLOR,
    BLACK_COLOR,
    WHITE_COLOR,
}