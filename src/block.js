// The types of blocks availiable
export const BLOCK = {
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

// Find some way to to generate numbers for no double colour block
export const randomBlock = () => {
    const block = 'RGB';
    // can't reach the final element, the empty cell
    const randomBlock = block[Math.floor(Math.random() * block.length)];
    return BLOCK[randomBlock];
}

export const emptyBlock = () => {
    return BLOCK['O'];
}