/* 
1. Goal:
2. Task:
3. Output:
*/

// Global variables
var allProductsList = [];

var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var containerElement = document.getElementById('container');

var firstRandomIndexNumber = 0;
var secondRandomIndexNumber = 0;
var thirdRandomIndexNumber = 0;


// Constructor functions

function Product(productName){
  this.productName = productName;
  this.filePath = `img/${productName}.jpg`;
  this.votes = 0;

  allProductsList.push(this);
}

// Prototype functions




// Call the constructor function




// Helper functionss

function randomIndexGenerator(){
  // uses the random number generator to get a random number between 0 and the length of the array. The random number will be the random index value of the array that we can use to find the product that will be displayed
  return Math.floor(Math.random() * allProductsList.length)
}

function render(){
  firstRandomIndexNumber = randomIndexGenerator();
  secondRandomIndexNumber = randomIndexGenerator();
  thirdRandomIndexNumber = randomIndexGenerator();

  while
}


// Event handler
function handleClick(e){
  var title = e.target.title;

  for(var i=0; i < allProductsList.length; i++){
    if(allProductsList[i].title === title){
      allProductsList[i]++;
    }
  }
  // once we have handled the event, added the vote, we need to render the next set of images for voting
  render();
}


// Event listener
containerElement.addEventListener('click', handleClick);


// Function call
