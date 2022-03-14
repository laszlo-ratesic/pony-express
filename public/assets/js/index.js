// *********************MEMORIAM SLIDESHOW***************************
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
// *********************END OF MEMORIAM SLIDESHOW***************************

// *********************COUNTDOWN TIMER***************************
$(document).ready(function() {
  let clock;

  // Grab the current date
  let currentDate = new Date();

  // Target future date/24 hour time/Timezone
  let targetDate = moment.tz("2022-10-21 00:00", "America/Chicago");

  // Calculate the difference in seconds between the future and current date
  let diff = targetDate / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!")

  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });

    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);

    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});
