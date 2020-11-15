/* 
1. Goal: Set up initial BusMall voting to take 25 votes and then display the voting results when a "View Results" button is clicked.
2. Tasks:
  a. Create mechanism to allow a user to vote on product with 3 images being displayed per round of voting
  b. Create mechanism to collect votes 
  c. Create mechanism to stop votes at 25 rounds
  d. Create mechanism to tally up votes per product
  e. Create mechanism to tally up number of times product was seen
  f. Create mechanism to "View Results" with a button
  g. Create a mechanism to diplay the results when the button is clicked
3. Output:
  a. 3 images to vote with
  b. total of 25 votes allowed, then voting stops
  c. a "View Results" button
  d. When the "View Results" button is pressed, it will return the output that shows votes for each product as well as number of times it was seen
*/

// Global variables
var allProductsList = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var containerElement = document.getElementById('container');
var votingRounds = 25;
var uniqueRandomNumbers = []; // added this from lecture 12


// Setting up to update the DOM
var viewResultsElement = document.getElementById('viewResults');
var votingResultsElement = document.getElementById('votingResults');
var listOfResultsParent = document.getElementById('listOfResults');


var firstRandomIndexNumber = 0;
var secondRandomIndexNumber = 0;
var thirdRandomIndexNumber = 0;


// Constructor functions

function Product(productName, fileExtension){
  this.productName = productName;
  this.filePath = `/img/${productName}.${fileExtension}`; 
  this.title = this.alt = productName;
  this.votes = 0;
  this.numberOfViews = 0;

  allProductsList.push(this);
}

// Prototype functions




// Call the constructor function

new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'gif');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');
new Product('wireframe', 'jpg');

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
    allProductsList[i].numberOfViews++;
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
    productListItem.textContent = `${allProductsList[i].productName} had ${allProductsList[i].votes}, and was seen ${allProductsList[i].numberOfViews} times.`;
    listOfResultsParent.appendChild(productListItem);
  }
  
}

// Event listener for image voting

for (var votingRoundCount = 0; votingRoundCount < votingRounds; votingRoundCount++){
  containerElement.addEventListener('click', handleClick);
}
console.log("you have completed 25 rounds of voting!")

// Event listener for View Results button
viewResultsElement.addEventListener('click', handleClick);  

// Function call
render();