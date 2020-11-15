'use strict';

/* 
1. Goal: Update BusMall with new logic on voting and add a chart
2. Tasks:
  a. ensure two rounds of voting does not have same images
  b. add an additional property to track how many times a product has appeared in a voting session
  c. add a bar chart with total votes (i.e. clicks); chart comes only after voting is complete - place it below the images
3. Output:
  a. total of 25 votes allowed, then voting stops
  b. a bar chart with total votes and total views; appears only after all votes are complete
  
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
var voteCountList = [];
var productNameList = [];



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
  for (var i = 0; i < 6; i++) {
    var randomNumber = randomNumberGenerator();

    // ensures random number is unique by checking to see if the new random number obtained is already in the unqiueRandomNumbers array. If it is, then it is NOT unique and therefore will call the generator to get a new random number.
    while (uniqueRandomNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGenerator();
    }

    // we are putting the latest random number obtained at the beginning of the array - this will allow us to keep popping off the old numbers from end of the array. See below for why we are popping off the last number in the array.
    uniqueRandomNumbers.unshift(randomNumber);
  }

  // ensure the array is only three values long; ** NOTE: this is still not clear after reviewing the lecture -- about a future where more numbers might be required -- need to ask **
  while (uniqueRandomNumbers.length > 6) {
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
    collectNameAndVoteData();
    generateBarChart();
  }
}

function putProductDataIntoLS(){
  // turns the allProductsList array into JSON
  var stringifiedProducts = JSON.stringify(allProductsList);
  // put the JSON array into local storage
  localStorage.setItem('products', stringifiedProducts);
}




// Step 6. Create an event listener to listen to the container
containerElement.addEventListener('click', voteForImages);


// Step 8. Create a function to collect names and the votes for each item
function collectNameAndVoteData(){
  for (var i=0; i < allProductsList.length; i++){
    productNameList.push(allProductsList[i].title);
    voteCountList.push(allProductsList[i].votes);
    viewsCountList.push(allProductsList[i].numberOfViews);
  }

}

// Step 9. Create a function to create the chart (using the code from chart.js: https://www.chartjs.org/docs/latest/)
function generateBarChart() {
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        //labels: productNameList,
        datasets: [{
            label: '# of Votes',
            data: voteCountList,           
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgb(204, 102, 255, 0.2)',
                'rgb(102, 255, 102, 0.2)',
                'rgb(102, 102, 51, 0.2)',
                'rgb(255, 51, 0, 0.2)',
                'rgb(51, 51, 255, 0.2)',
                'rgb(255, 153, 153, 0.2)',
                'rgb(255, 102, 204, 0.2)',
                'rgb(0, 102, 153, 0.2)',
                'rgb(255, 0, 255, 0.2)',
                'rgb(102, 153, 0, 0.2)',
                'rgb(255, 102, 0, 0.2)',
                'rgb(181, 33, 34, 0.2)',
                'rgb(255, 116, 34, 0.2)',
                'rgb(135, 213, 216, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            order: 2
        },{    
          label: '# of Views',
          data: viewsCountList,
          type: 'line',
          backgroundColor: [
            'rgb(255, 255, 255, 0.2)',
          ],
          order: 1
  }],
  labels: productNameList,
},    
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}


// Function call
render();