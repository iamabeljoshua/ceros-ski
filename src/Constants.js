export const GAME_INFO_PANEL_WIDTH = 332;
export const GAME_WIDTH = window.innerWidth - GAME_INFO_PANEL_WIDTH;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const SKIER_JUMP_1 = 'skierJump1'
export const JUMP_RAMP = "jumpRamp";
export const RHINO_DEFAULT = "rhinoDefault";
export const RHINO_LIFT = "rhinoLift";
export const RHINO_LIFT_MOUTH_OPEN = "rhinoLiftMouthOpen";
export const RHINO_LIFT_EAT_1 = "rhinoLiftEat1";
export const RHINO_LIFT_EAT_2 = "rhinoLiftEat2";
export const RHINO_LIFT_EAT_3 = "rhinoLiftEat3";
export const RHINO_LIFT_EAT_4 = "rhinoLiftEat4";
export const RHINO_RUN_LEFT_1 = "rhinoRunLeft_1";
export const RHINO_RUN_LEFT_2 = "rhinoRunLeft_2";


export const SKIER_STARTING_SPEED = 6;
export const SKIER_TURBO_SPEED = SKIER_STARTING_SPEED * 2;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_JUMP_DURATION_MILLS = 1000 * 5; 
export const SKIER_TURBO_SPEED_DURATION_MILLS = 1000 * 5; 

export const MIN_RHINO_SPEED = 2;

export const MAX_RHINO_SPEED = 5;

export const MAX_NUMBER_RHINOS = 2;

export const RHINO_EATING_SEQUENCE_DELAY_MILLS = 600;

export const SKIER_LIFE_COUNT = 5;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [SKIER_JUMP_1] : 'img/skier_jump_1.png',
    [JUMP_RAMP]:'img/jump_ramp.png',
    [RHINO_DEFAULT]:'img/rhino_default.png',
    [RHINO_LIFT]:'img/rhino_lift.png',
    [RHINO_LIFT_MOUTH_OPEN]:'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT_EAT_1]:'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_2]:'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_3]:'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_4]:'img/rhino_lift_eat_4.png',
    [RHINO_RUN_LEFT_1]:'img/rhino_run_left.png',
    [RHINO_RUN_LEFT_2]:'img/rhino_run_left_2.png',

};

export const RHINO_RUN_LEFT_SEQUENCE_ASSETS = [
    RHINO_RUN_LEFT_1,
    RHINO_RUN_LEFT_2
]

export const RHINO_EATING_SEQUENCE_ASSETS = [
    RHINO_LIFT,
    RHINO_LIFT_MOUTH_OPEN,
    RHINO_LIFT_EAT_1,
    RHINO_LIFT_EAT_2,
    RHINO_LIFT_EAT_3,
    RHINO_LIFT_EAT_4,
]

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    J:74,
    SPACE_BAR:32,
    R:82,
    F:70
};