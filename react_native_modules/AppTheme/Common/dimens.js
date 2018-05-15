
import Dimensions from "Dimensions";
const SCREEN_WIDTH = Dimensions.get("window").width;
const ratio = SCREEN_WIDTH / 360;

let Font = {
    D1: 38*ratio,
    D2: 24*ratio,
    D3: 22*ratio,
    H1: 18*ratio,
    H2: 17*ratio,
    H3: 16*ratio,
    T1: 14*ratio,
    T2: 13*ratio,
    T3: 11*ratio,
    T4: 10*ratio,
};
let FontWeight = {
    D1: '300',
    D2: '300',
    D3: '300',
    H1: '300',
    H2: 'normal',
    H3: '300',
    T1: '300',
    T2: 'normal',
    T3: 'normal',
    T4: 'normal',
};

let Grid = {
    A: SCREEN_WIDTH/12,
    a: SCREEN_WIDTH/60,
};

export {
    Font,
    FontWeight,
    Grid,
};
