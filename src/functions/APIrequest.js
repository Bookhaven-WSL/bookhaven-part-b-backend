async function getMultipleApiEntriesTitle (title) {
    try {

        let formattedTitle = title.trim().toLowerCase().replace(/ /g, '+')

        const response = await fetch(`https://openlibrary.org/search.json?title=${formattedTitle}`, {
            methods: "GET"
        })
        if (response.ok) {
            let largeBody = await response.json()
            let smallBody = []
            for (let i = 0; i < 20; i ++) {
                smallBody.push(largeBody.docs[i])
            }

            let body = []
            for (let book of smallBody) {
                let olid = book.key
                let title = book.title
                let authors = book.author_name
                let genre = book.subject
                let publishYear = book.first_publish_year

                let imgOlid = olid.slice(7)
                let imgURL = `https://covers.openlibrary.org/w/olid/${imgOlid}-M.jpg`

                body.push([{"olid": olid}, {"title": title}, {"authors": authors}, {"genres": genre}, {"publishYear": publishYear}, {"coverImage": imgURL}])
            }
            return body
        }
        else {
            if (response.status == "404") {
                const body = {"error": "Oh dear, we couldn't find any books matching this name! Try again."}
                return body
            }
            else if (response.status == "429") {
                const body = {"error": "Unfortunately the API this service relies on has been requested too frequently in a short period of time. Please wait for more results."}
                return body
            }
            else {
                const body = {"error": "An unexpected error occured."}
                console.log(response.status)
                return body
            }
        }
    }
    catch (error) {
        return error.message
    }
}

async function getMultipleApiEntriesGenre (genre) {
    try {

        let formattedGenre = genre.trim().toLowerCase().replace(/ /g, '+')

        const response = await fetch(`https://openlibrary.org/search.json?subject=${formattedGenre}`, {
            methods: "GET"
        })
        if (response.ok) {
            let largeBody = await response.json()
            let smallBody = []
            for (let i = 0; i < 20; i ++) {
                smallBody.push(largeBody.docs[i])
            }

            let body = []
            for (let book of smallBody) {
                let olid = book.key
                let title = book.title
                let authors = book.author_name
                let genre = book.subject
                let publishYear = book.first_publish_year

                let imgOlid = olid.slice(7)
                let imgURL = `https://covers.openlibrary.org/w/olid/${imgOlid}-M.jpg`

                body.push([{"olid": olid}, {"title": title}, {"authors": authors}, {"genres": genre}, {"publishYear": publishYear}, {"coverImage": imgURL}])
            }
            return body
        }
        else {
            if (response.status == "404") {
                const body = {"error": "Oh dear, we couldn't find any books matching this name! Try again."}
                return body
            }
            else if (response.status == "429") {
                const body = {"error": "Unfortunately the API this service relies on has been requested too frequently in a short period of time. Please wait for more results."}
                return body
            }
            else {
                const body = {"error": "An unexpected error occured."}
                console.log(response.status)
                return body
            }
        }
    }
    catch (error) {
        return error.message
    }
}

// async function getSingleApiEntry (olid) {
//     try {

//         let formattedKey = olid.slice(7);
        
//         const response = await fetch(`https://openlibrary.org/search.json?q=${formattedKey}`, {
//             methods: "GET"
//         })
//         if (response.ok) {
//             let largeBody = await response.json()
//             let smallBody = []
//             smallBody.push(largeBody.docs[0])

//             let olid = smallBody[0].key
//             let title = smallBody[0].title
//             let authors = smallBody[0].author_name
//             let genre = smallBody[0].subject
//             let publishYear = smallBody[0].first_publish_year

//             let imgOlid = olid.slice(7)
//             let imgURL = `https://covers.openlibrary.org/w/olid/${imgOlid}-M.jpg`

//             let body = []
//             body.push([{"olid": olid}, {"title": title}, {"authors": authors}, {"genres": genre}, {"publishYear": publishYear}, {"coverImage": imgURL}])

//             return body
//         }
//         else {
//             if (response.status == "404") {
//                 const body = {"error": "Oh dear, we couldn't find any books matching this name! Try again."}
//                 return body
//             }
//             else if (response.status == "429") {
//                 const body = {"error": "Unfortunately the API this service relies on has been requested too frequently in a short period of time. Please wait for more results."}
//                 return body
//             }
//             else {
//                 const body = {"error": "An unexpected error occured."}
//                 console.log(response.status)
//                 return body
//             }
//         }
//     }
//     catch (error) {
//         return error.message
//     }
// }
async function getSingleApiEntry(olid) {
    try {
        // Remove "OLID:" prefix (if needed) from the ID
        let formattedKey = olid.slice(7);

        // Fetch data from OpenLibrary API
        const response = await fetch(`https://openlibrary.org/search.json?q=${formattedKey}`, {
            method: "GET", // 'methods' should be 'method'
        });

        if (response.ok) {
            // Parse the JSON data returned by the API
            let largeBody = await response.json();
            let smallBody = largeBody.docs[0];

            if (!smallBody) {
                return { error: "No results found for this OLID." };
            }

            // Construct the necessary fields
            let apiOlid = smallBody.key;
            let title = smallBody.title;
            let authors = smallBody.author_name || ["Unknown Author"];
            let genre = smallBody.subject || ["Unknown Genre"];
            let publishYear = smallBody.first_publish_year || "Unknown Year";
            
            // Construct the image URL
            let imgOlid = apiOlid.slice(7); // remove "OLID:" prefix if needed
            let imgURL = `https://covers.openlibrary.org/b/id/${imgOlid}-M.jpg`;

            // Return the formatted book object
            return [
                {
                    olid: apiOlid,
                    title,
                    authors,
                    genre,
                    publishYear,
                    coverImage: imgURL,
                }
            ];
        } else {
            // Error handling based on response status code
            let errorMsg = "An unexpected error occurred.";
            if (response.status === 404) {
                errorMsg = "Book not found in the API.";
            } else if (response.status === 429) {
                errorMsg = "API rate limit exceeded. Please try again later.";
            }

            // Return the error message
            return { error: errorMsg };
        }
    } catch (error) {
        console.error("Error fetching data from OpenLibrary:", error);
        return { error: error.message };
    }
}
module.exports = {
    getMultipleApiEntriesTitle,
    getMultipleApiEntriesGenre,
    getSingleApiEntry
}