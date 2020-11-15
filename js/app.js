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
var viewResultsElement = document.getElementById('viewResults');
var votingResultsElement = document.getElementById('votingResults');
var listOfResultsParent = document.getElementById('listOfResults');

var firstRandomIndexNumber = 0;
var secondRandomIndexNumber = 0;
var thirdRandomIndexNumber = 0;


// Constructor functions

function Product(productName){
  this.productName = productName;
  this.filePath = `img/${productName}.jpg`; 
  //this.filePath = `img/${productName}.png`;   // TODO: need to figure out how to make filePath work with differnet image file extensions and non-.jpg files in the img folder
  this.title = this.alt = productName;
  this.votes = 0;
  this.numberOfTimesSeen = 0;

  allProductsList.push(this);
}

// Prototype functions




// Call the constructor function

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');
new Product('wireframe');

// Helper functionss

function randomIndexGenerator(){
  // uses the random number generator to get a random number between 0 and the length of the array. The random number will be the random index value of the array that we can use to find the product that will be displayed
  return Math.floor(Math.random() * allProductsList.length)
}

function render(){
  firstRandomIndexNumber = randomIndexGenerator();
  secondRandomIndexNumber = randomIndexGenerator();
  thirdRandomIndexNumber = randomIndexGenerator();
  
  // this section is to ensure that we do not get duplicate product images.
  // TODO: Find a simpler way to implement this
  while(secondRandomIndexNumber === firstRandomIndexNumber || secondRandomIndexNumber === thirdRandomIndexNumber || firstRandomIndexNumber === thirdRandomIndexNumber){
    if (secondRandomIndexNumber === firstRandomIndexNumber){
      secondRandomIndexNumber = randomIndexGenerator();
    }
    if (secondRandomIndexNumber === thirdRandomIndexNumber){
      secondRandomIndexNumber = randomIndexGenerator();
    }
    if (firstRandomIndexNumber === thirdRandomIndexNumber){
      firstRandomIndexNumber = randomIndexGenerator();
    }
  }
  imageOneElement.src = allProductsList[firstRandomIndexNumber].filePath;
  imageOneElement.title = allProductsList[firstRandomIndexNumber].title;
  imageOneElement.alt = allProductsList[firstRandomIndexNumber].alt;

  imageTwoElement.src = allProductsList[secondRandomIndexNumber].filePath;
  imageTwoElement.title = allProductsList[secondRandomIndexNumber].title;
  imageTwoElement.alt = allProductsList[secondRandomIndexNumber].alt;

  imageThreeElement.src = allProductsList[thirdRandomIndexNumber].filePath;
  imageThreeElement.title = allProductsList[thirdRandomIndexNumber].title;
  imageThreeElement.alt = allProductsList[thirdRandomIndexNumber].alt;

}


// Event handler function for voting on image; when clicked gets three new product images

function handleClick(e){
  //standard code to prevent deletion of data
  e.preventDefault();
  
  var title = e.target.title;

  for(var i=0; i < allProductsList.length; i++){
    if(allProductsList[i].title === title){
      allProductsList[i].votes++;
    }
    // counts the number of times this item has been seen
    allProductsList[i].numberOfTimesSeen++;
  }
  // once we have handled the event, added the vote, we need to render the next set of images for voting
  render();
}

// Event handler for View Results button; when clicked it displays the outcome of the voting with each item on the catalog with the votes and the number of times seen
function handleViewResultsClick(e){
  // standard code to prevent deletion of data
  e.preventDefault();

  // create a list title with h3
  var listTitle = document.createElement('h3');
  listTitle.textContent = "Voting Results";
  votingResultsElement.appendChild(listTitle);

  // create list items with the output of the results
  for (var i = 0; i < allProductsList.length; i++) {
    var productListItem = document.createElement('li')
    productListItem.textContent = `${allProductsList[i].productName} had ${allProductsList[i].votes}, and was seen ${allProductsList[i].numberOfTimesSeen} times.`;
    listOfResultsParent.appendChild(productListItem);
  }
  
}

// Event listener for image voting
var votingRounds = 25;

for (var votingRoundCount = 0; votingRoundCount < votingRounds; votingRoundCount++){
  containerElement.addEventListener('click', handleClick);
}
console.log("you have completed 25 rounds of voting!")

// Event listener for View Results button
viewResultsElement.addEventListener('click', handleClick);  

// Function call
render();