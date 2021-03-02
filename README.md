# Puyo

Minimal implementation of the game Puyo-Puyo built using custom hooks in React. 

Currently hosted using Github Pages at https://wyu17.github.io/Puyo/.

## How To Play

Left and right arrow keys move the puyo block left and right. The up arrow rotates the current block, while the down arrow will increase the speed the current block falls to the ground. Matching four blocks of the same colour will cause them to disappear and for the player to gain points. This can cause chains after the first blocks have disappeared: this will cause the player to gain more points.

The player loses once a new block cannot be created (i.e the initial point is obstructed by other blocks).

![image](https://user-images.githubusercontent.com/62117275/109698211-e5989080-7bda-11eb-869e-4b63c2f0e371.png)

## How to Host

Serving this app will require Node.js >= 10.16 and npm >= 5.6.

After the dependencies have been installed with npm install, the application can be served with npm start. 

The hosted app will then be accessible at localhost:3000.  

## Planned Features:

### Multiplayer

Being able to play with others competitively is planned for implementation.

### Quality of Life Features

Pausing the game, and difficulty levels are planned for implementation.

## Credits

### Dan Abramov's setInterval hook 
https://overreacted.io/making-setinterval-declarative-with-react-hooks/

### Github Workflow
pages.yml file adapted from https://medium.com/front-end-weekly/ci-cd-with-github-actions-to-deploy-on-github-pages-73e225f8f131

### Bootstrapped using Create-React-App
https://reactjs.org/docs/create-a-new-react-app.html
