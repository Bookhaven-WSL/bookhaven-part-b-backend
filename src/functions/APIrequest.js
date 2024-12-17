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

async function getSingleApiEntry (olid) {
    try {

        let formattedKey = olid.slice(7);
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${formattedKey}`, {
            methods: "GET"
        })
        if (response.ok) {
            let largeBody = await response.json()
            let smallBody = []
            smallBody.push(largeBody.docs[0])

            let olid = smallBody[0].key
            let title = smallBody[0].title
            let authors = smallBody[0].author_name
            let genre = smallBody[0].subject
            let publishYear = smallBody[0].first_publish_year

            let imgOlid = olid.slice(7)
            let imgURL = `https://covers.openlibrary.org/w/olid/${imgOlid}-M.jpg`

            let body = []
            body.push([{"olid": olid}, {"title": title}, {"authors": authors}, {"genres": genre}, {"publishYear": publishYear}, {"coverImage": imgURL}])

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

module.exports = {
    getMultipleApiEntriesTitle,
    getMultipleApiEntriesGenre,
    getSingleApiEntry
}