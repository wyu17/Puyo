export const block = {
    R: {
        color: '255, 0, 0'
    },
    G: {
        color: '0, 255, 0'
    },
    B: {
        color: '0, 0, 255'
    },
    O: {
        color: '0, 0, 0'
    },
}

export const randomBlock = () => {
    const block = 'RGB';
    // can't reach the final element, the empty cell
    const randomBlock = block[Math.floor(Math.random() * block.length)];
    return block[randomBlock];
}