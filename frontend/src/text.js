function parseItinerary(rawText) {
    const lines = rawText.split("\n");
    //   console.log(lines)
    let newText = ""
    for(text in lines) {
        newText += lines[text] + "<br/>"
    }
    // for (const text in lines) {
    //     if (lines[text] !== '-') {
    //         if (lines[text] === 'Day') {
    //             newText += "<br/><br/>" + lines[text] + " "
    //         } else {
    //             newText += lines[text] + " "
    //         }
    //     } else {
    //         newText += '<br/>'
    //     }
    // }
    console.log(newText)
    return newText
}

const raw = "1. Taj Mahal, Agra: Visit this iconic UNESCO World Heritage site and architectural marvel known for its white marble monument and beautiful gardens.\n2. Jaipur, Rajasthan: Explore the vibrant \"Pink City\" and visit its magnificent forts, palaces, and enchanting bazaars showcasing traditional Rajasthani culture.\n3. Kerala Backwaters: Experience the serene beauty of Kerala's backwaters, with breathtaking landscapes, tranquil boat rides, and charming houseboat stays."
const ans = parseItinerary(raw)