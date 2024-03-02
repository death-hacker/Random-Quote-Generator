document.addEventListener('DOMContentLoaded', getQuote);

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

newQuoteButton.addEventListener('click', () => {
  getQuote();
  animateButton();
});

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    const { content, author } = data;
    quoteElement.classList.remove('visible');
    setTimeout(() => {
      quoteElement.textContent = `"${content}"`;
      authorElement.textContent = `- ${author}`;
      quoteElement.classList.add('visible');
    }, 500);
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
}

function animateButton() {
  newQuoteButton.classList.add('animate');
  setTimeout(() => {
    newQuoteButton.classList.remove('animate');
  }, 300);
}
