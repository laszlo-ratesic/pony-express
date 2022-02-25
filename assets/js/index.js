let holder = document.querySelectorAll('.card-container')[0],
  cards = document.querySelectorAll('.mem-card');

let preActiveCard = cards[1];
let nextActiveCard = cards[2];

function scrollLeft() {
  holder.classList.remove('next');
  holder.classList.remove('reset');
  holder.classList.add('next');

  preActiveCard.classList.remove('mem-active');
  nextActiveCard.classList.add('mem-active');
  setTimeout(reset, 1200);
}

function reset() {
  holder.classList.remove('next');
  holder.classList.add('reset');
  preActiveCard.classList.add('mem-active');
  nextActiveCard.classList.remove('mem-active');
}

setInterval(scrollLeft, 6000);


$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}, 3000);