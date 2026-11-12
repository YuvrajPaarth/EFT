const para = [
    "Life & Perspective: Life is like riding a bicycle. To keep your balance, you must keep moving. — Albert Einstein",
    "Choices & Character: It is our choices, Harry, that show what we truly are, far more than our abilities. — J.K. Rowling",
    "Action & Persistence: Believe you can and you're halfway there. — Theodore Roosevelt",
    "Learning: The whole of life, from the moment you are born to the moment you die, is a process of learning. — Jiddu Krishnamurti"
]

const usedIndexes = new Set()
const quoteTag = document.getElementById("quote") 

function generateQuote(){
    if (usedIndexes.size >= para.length){
        usedIndexes.clear()
    }


    while(true){
        const randomIdx = Math.floor(Math.random() * para.length)

        if (usedIndexes.has(randomIdx)) continue;

        const quote = para[randomIdx]
        quoteTag.innerHTML = quote;
        usedIndexes.add(randomIdx)
        break
    }
    
}