
    let currentIndex = 0;
    let quotes = [];

    async function fetchQuotes() {
      try {
        const response = await fetch('https://dummyjson.com/quotes');
        const data = await response.json();
        quotes = data.quotes;
        author = data.author;
        displayQuote();
      } catch (error) {
        document.getElementById('quote').textContent = "Failed to load quotes.";
        console.error("Error fetching quotes:", error);
      }
    }

    function displayQuote() {
      if (quotes.length === 0) return;
      const quote = quotes[currentIndex];
      document.getElementById('quote').textContent = `"${quote.quote}"`;
      document.getElementById('author').textContent = `- ${quote.author}`;
    }

    document.getElementById('nextQuote').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      displayQuote();
    });

    document.getElementById('copyQuote').addEventListener('click', () => {
      const quoteText = document.getElementById('quote').textContent + " " + document.getElementById('author').textContent;
      navigator.clipboard.writeText(quoteText)
        .then(() => alert("Quote copied to clipboard!"))
        .catch(err => console.error("Failed to copy:", err));
    });

    // Initial load
    fetchQuotes();
