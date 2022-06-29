//const API_URL = `https://itunes.apple.com/search?term=`
const fetchSearch = (search) => {
    return fetch(`https://itunes.apple.com/search?term=${search}`)
    .then(response => response.json())
    .then(resData => resData.results)
}

const wrapPromise = (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })

    return {
        read() {
            if(status === 'pending') {
                throw suspender
            }
            else if (status === 'error'){
                throw result
            }
            return result
        }
    }
}

export const createResource = (search) => {
    return {
        result: wrapPromise(fetchSearch(search))
    }
}