import { getToken } from '../auth'
import { servAddr } from '../consts'

export const rateBook = (isbn, rate) => {
    const url = servAddr + `/breco/rate_book`
    const formData = new FormData()
    formData.append('isbn', isbn)
    formData.append('rate', rate)
    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'x-access-tokens': getToken()
        }
    })
    .then(res => res.json())
}