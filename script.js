$(document).ready(fucntion() {
// 1. write fn to scrape articles w/ AJAX call
    
// 2. write fn to render articles in ui

// 3. call render articles fn in .then() of promise of scrape articles fn

// Example setup
function scrapeArticles() {
    // something like this
      $.ajax({
        method: "GET",
        url: "/api/scrape/"
      })
        .then(function() {
          renderArticles();
        });
}

function renderArticles(){
  // write AJAX fn to get all articles
    
  // for each article, you want to create a new element from the skeleton we mocked up, with the scraped article's title, header and summary
  
  // push each article into .container-articles
   
}
});