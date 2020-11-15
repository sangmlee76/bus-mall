'use strict';

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


// Step 1. Global variables
var allProductsList = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var containerElement = document.getElementById('container');
var votingRounds = 25;
var voteCounter = 0;
var uniqueRandomNumbers = []; // added this from lecture 12


// Setting up to update the DOM
var viewResultsElement = document.getElementById('viewResults');
var votingResultsElement = document.getElementById('votingResults');
var listOfResultsParent = document.getElementById('listOfResults');

// Step 2. Constructor functions
function Product(productName, fileExtension) {
  this.filePath = `/img/${productName}.${fileExtension}`;
  this.title = this.alt = productName;
  this.votes = 0;
  this.numberOfViews = 0;

  allProductsList.push(this);
}

// Prototype functions -- NONE


// Step 3. Make object instances
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


// Helper functions: render(), getUniqueRandomNumbers(), randomNumberGenerator(), voteForImages(e), handleViewResultsClick(e)

// Step 4. Create a render function to put three images on the same page
function render() {
  getUniqueRandomNumbers();

  var firstIndexNumber = uniqueRandomNumbers[0];
  var secondIndexNumber = uniqueRandomNumbers[1];
  var thirdIndexNumber = uniqueRandomNumbers[2];

  imageOneElement.src = allProductsList[firstIndexNumber].filePath;
  imageOneElement.title = allProductsList[firstIndexNumber].title;
  imageOneElement.alt = allProductsList[firstIndexNumber].alt;
  allProductsList[firstIndexNumber].numberOfViews++;

  imageTwoElement.src = allProductsList[secondIndexNumber].filePath;
  imageTwoElement.title = allProductsList[secondIndexNumber].title;
  imageTwoElement.alt = allProductsList[secondIndexNumber].alt;
  allProductsList[secondIndexNumber].numberOfViews++;

  imageThreeElement.src = allProductsList[thirdIndexNumber].filePath;
  imageThreeElement.title = allProductsList[thirdIndexNumber].title;
  imageThreeElement.alt = allProductsList[thirdIndexNumber].alt;
  allProductsList[thirdIndexNumber].numberOfViews++;
}

// Step 5. Create a unique random number function to ensure no duplicates
function getUniqueRandomNumbers() {
  uniqueRandomNumbers = []; // this is to empty the array before repopulating it each round

  // get each of the random numbers from the generator using a for loop, but each round of getting the nunber also checks for uniqueness
  for (var i = 0; i < 3; i++) {
    var randomNumber = randomNumberGenerator();

    // ensures random number is unique by checking to see if the new random number obtained is already in the unqiueRandomNumbers array. If it is, then it is NOT unique and therefore will call the generator to get a new random number.
    while (uniqueRandomNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGenerator();
    }

    // we are putting the latest random number obtained at the beginning of the array - this will allow us to keep popping off the old numbers from end of the array. See below for why we are popping off the last number in the array.
    uniqueRandomNumbers.unshift(randomNumber);
  }

  // ensure the array is only three values long; ** NOTE: this is still not clear after reviewing the lecture -- about a future where more numbers might be required -- need to ask **
  while (uniqueRandomNumbers.length > 3) {
    uniqueRandomNumbers.pop();
  }

}

function randomNumberGenerator() {
  // uses the random number generator to get a random number between 0 and the length of the array. The random number will be the random index value of the array that we can use to find the product that will be displayed
  return Math.floor(Math.random() * allProductsList.length);
}


// Step 7. Create an event handler function for voting on image; when clicked gets three new product images

function voteForImages(e) {
  //standard code to prevent deletion of data
  // e.preventDefault();   <-- this is only used for forms; not needed here

  var titleOfClick = e.target.title;

  for (var i = 0; i < allProductsList.length; i++) {
    if (allProductsList[i].title === titleOfClick) {
      allProductsList[i].votes++;
      voteCounter++;
    }
  }

  // once we have handled the event, added the vote, we need to render the next set of images for voting
  render();   // this resets the page -- don't need inner.HTML = ''

  // if the voting round is 25, remove the event listener -- this will stop the ability to vote
  if (voteCounter === votingRounds) {
    containerElement.removeEventListener('click', voteForImages);
  }
}

// Step 9. Create an event handler for View Results button; when clicked it displays the outcome of the voting with each item on the catalog with the votes and the number of times seen
function handleViewResultsClick() {

  // create a list title with h3
  var listTitle = document.createElement('h3');
  listTitle.textContent = "Voting Results";
  votingResultsElement.appendChild(listTitle);

  // create list items with the output of the results
  for (var i = 0; i < allProductsList.length; i++) {
    var productListItem = document.createElement('li');
    productListItem.textContent = `${allProductsList[i].title} had ${allProductsList[i].votes} votes, and was seen ${allProductsList[i].numberOfViews} times.`;
    listOfResultsParent.appendChild(productListItem);
  }

}

// Step 6. Create an event listener to listen to the container
containerElement.addEventListener('click', voteForImages);


// Step 8. Create an event listener for View Results button
viewResultsElement.addEventListener('click', handleViewResultsClick);

// Function call
render();