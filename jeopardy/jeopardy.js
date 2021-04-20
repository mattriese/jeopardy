'use strict';

const BASE_API_URL = 'http://jservice.io/api/';
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

// categories is the main data structure for the app; it should eventually look like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: "4", showing: null},
//        {question: "1+1", answer: "2", showing: null}, ... 3 more clues ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
//      ],
//    }, ...4 more categories ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random categories from API.
 *
 * Returns array of category ids, e.g. [4, 12, 5, 9, 20, 1]
 */
// Find the appropriate number of random category IDs by requesting random clues from the API's /random endpoint
// Take the category IDs from each random clue and build an array of category IDs
async function getCategoryIds(numberOfCategories) {
  console.debug('getCategoryIds ran');
  const response = await axios({
    url: `${BASE_API_URL}/random`,
    method: 'GET',
    params: { count: numberOfCategories },
  });
  console.log('categories response: ', response);
  return response.data.map((category) => category.category_id);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ... 3 more ...
 *   ]
 */
// request the appropriate number of categories from the API's /category endpoint and use map()
// to create a new object of each category with just the needed properties: title, clue question, clue answer, and
// add the showing property to control the revealing of questions and answers in the DOM
async function getCategory(catId) {
  console.debug('getCategory ran');
  let response = await axios({
    url: `${BASE_API_URL}/category`,
    method: 'GET',
    params: { id: catId },
  });
  let clueArray = response.data.clues.map(function (clue) {
    return {
      question: `${clue.question}`,
      answer: `${clue.answer}`,
      showing: null,
    };
  });
  return {
    title: `${response.data.title}`,
    clues: clueArray,
  };
}

/** Fill an HTML table with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM-QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
// First loop through categories and build the row in thead and create a th for each category
// Then do a nested loop to fill the cells. Use the indexes of the two for loops to set a class for
// the row and column of each td, so the event handler can find which question/answer to put in which box
function fillTable(cats, cluesPerCat) {
  console.debug('fillTable ran');
  for (let i = 0; i < cats; i++) {
    $('thead tr').append(`<th>${categories[i].title}</th>`);
  }
  for (let i = 0; i < cluesPerCat; i++) {
    let $newRow = $('<tr></tr>');
    for (let j = 0; j < cats; j++) {
      $newRow.append(`<td class="r${i} c${j}">?</td>`);
    }
    $('#tbody').append($newRow);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(e) {
  console.debug('handleClick ran');
  // pick out the row and colum numbers from the class list, as set in the nested for loop in filltable()
  let $classlist = $(e.target).attr('class');
  let row = $classlist[1];
  let column = $classlist[4];
  // determine which clue to chose from categories[] using the row and column information
  let clue = categories[column].clues[row];
  if (clue.showing === null) {
    $(e.target).text(`${clue.question}`);
    clue.showing = 'question';
  } else if (clue.showing === 'question') {
    $(e.target).text(`${clue.answer}`);
    clue.showing = 'answer';
    $(e.target).css('background-color', '#28a200');
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
  console.debug('showLoadingView ran');
  $('thead tr').empty();
  $('#tbody').empty();
  $('.fa-spinner').show();
  $('#start-btn').text('Loading...');
  $('#start-btn').css('background-color', '#74119c');
  $('table').hide();
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
  console.debug('hideLoadingView ran');
  $('.fa-spinner').hide();
  $('#start-btn').text('Restart!');
  $('table').show();
}

/** Setup game data and board:
 * - get random category Ids
 * - get data for each category
 * - call fillTable to create HTML table
 */
async function setupGameBoard() {
  console.debug('setupGameBoard ran');
  let catIds = await getCategoryIds(NUM_CATEGORIES);
  for (let catId of catIds) {
    categories.push(await getCategory(catId));
  }
  fillTable(NUM_CATEGORIES, NUM_CLUES_PER_CAT);
}

/** Start game: show loading state, setup game board, stop loading state */
async function setupAndStart() {
  console.debug('setupAndStart ran');
  $('table').show();
  categories = [];
  showLoadingView();
  await setupGameBoard();
  hideLoadingView();
}

/** At start:
 *
 * - Add a click handler to your start button that will run setupAndStart
 * - Add a click handler to your board that will run handleClick
 *   when you click on a clue
 */
$('.fa-spinner').hide();
$('table').hide();
$('#table').on('click', 'td', handleClick);
$('#start-btn').on('click', setupAndStart);
