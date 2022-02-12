
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function complete()
{
    if (!loader.hidden)
    {
        quoteContainer.hidden =false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote()
{
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try
    {
        const response = await fetch(proxyUrl + apiUrl);
        const data= await response.json();
        // console.log(data);
        if (data.quoteAuthor === '')
        {
            authorText.innerText = "Unknown";
        }
        else
        {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 60)
        {
            quoteText.classList.add('long-quote');
        }
        else
        {
            quoteText.classList.remove('long-quote');
        }
        // authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
        complete();

    }
    //Stop Loader Show Quote
    
    catch(error)
    {
        getQuote();
        // console.log("Whoops",error);
    }
}
newQuoteBtn.addEventListener('click',getQuote);

// On Load

getQuote();
// loading();