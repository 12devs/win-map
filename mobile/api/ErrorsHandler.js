export default function (response) {
    if (response.status >= 200 && response.status < 500) {
        return response
    }

    throw new Error()
}
