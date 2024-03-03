document.addEventListener('DOMContentLoaded', getQuote);

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const readAloudButton = document.getElementById('read-aloud');
const shareQuoteButton = document.getElementById('share-quote');

newQuoteButton.addEventListener('click', () => {
  getQuote();
  animateButton();
});

readAloudButton.addEventListener('click', () => {
  const quoteText = document.getElementById('quote').textContent;
  const authorText = document.getElementById('author').textContent;
  const readText = quoteText.concat(" by ",authorText);
  const utterance = new SpeechSynthesisUtterance(readText);
  window.speechSynthesis.speak(utterance);
});

function getGmailShareURL(quoteText, subject = 'Check out this quote') {
  const recipient = '';
  const encodedSubject = encodeURIComponent(subject);
  const quote1 = document.getElementById('quote').textContent;
  const encodedBody = quote1.concat('\n\n- Shared via Random Quote Generator');
  const mail1 = 'mailto:?subject="Quote of the Day"&body='
  const mail = mail1.concat(encodedBody);
  
  return mail;
}

shareQuoteButton.addEventListener('click', () => {
  const quoteText = document.getElementById('quote').textContent;
  const gmailShareURL = getGmailShareURL(quoteText);
  window.open(gmailShareURL, '_blank');
});

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    const { content, author } = data;
    quoteElement.classList.remove('visible');
    setTimeout(() => {
      quoteElement.textContent = `${content}`;
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
