export var stage_width = 10;
export var stage_height = 20;

export const createStage = () =>
    Array.from(Array(stage_height), () => 
    new Array(stage_width).fill([0, 'clear'])
    )
