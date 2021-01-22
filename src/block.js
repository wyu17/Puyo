// The types of blocks availiable
const BLOCK = {
    R: {
        color: "RED"
    },
    G: {
        color: "GREEN"
    },
    B: {
        color: "BLUE"
    },
    O: {
        color: "EMPTY"
    },
}

export const randomBlock = () => {
    const block = 'RGB';
    // can't reach the final element, the empty cell
    const randomBlock = block[Math.floor(Math.random() * block.length)];
    return BLOCK[randomBlock];
}

export const emptyBlock = () => {
    return BLOCK['O'];
}