document.addEventListener('DOMContentLoaded', getQuote);

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');

newQuoteButton.addEventListener('click', getQuote);

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    const { content, author } = data;
    quoteElement.textContent = `"${content}"`;
    authorElement.textContent = `- ${author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
}
