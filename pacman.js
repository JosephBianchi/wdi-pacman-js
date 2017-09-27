// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'inky',
  colour: 'red',
  character: 'shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'blinky',
  colour: 'cyan',
  character: 'speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'pinky',
  colour: 'pink',
  character: 'bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'clyde',
  colour: 'orange',
  character: 'pokery',
  edible: false
};

// create ghost array - array w/ all ghosts
var ghosts  = [inky, blinky, pinky, clyde]

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\n    Power-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  for (var i = 0; i < ghosts.length; i++) {
    console.log('(' + ghosts[i].menu_option + ')' + ' eat ' + ghosts[i].name + ' ' + edibleState(ghosts[i].edible));
  }
  if (powerPellets < 1) {
    console.log('No powerpellets left gangsta - you mad bro?');
  }
  else {
    console.log('(p) Eat Power-Pellets');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      }
      else {
        console.log('\nThat key is invalid - please I wont ask you agin');
      }
    default:
      console.log('\nThat key is invalid - pleae I wont ask you agin');
  }
}

// process eating an inedible ghost
function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log(ghost.colour + ' ' + ghost.name + ' kills pac-man');
    lives --;
    deadForEver()
  } else {
    console.log('pac-man eats' + ghost.character + ' ' + ghost.name);
    score += 200
    ghost.edible = false;
  }
}

function eatPowerPellet() {
  console.log('Eat that powerpellets gangsta!');
  score += 50;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  powerPellets --;
}

function edibleState(state) {
  if (edibleState === true) {
    return 'edible'
  }
  else {
    return 'inedible'
  }
}

function deadForEver() {
  if (lives < 0) {
    process.exit()
  }
}
//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
