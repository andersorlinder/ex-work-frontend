async function postRequest(apiURL: string, body: string) {
    return await fetch(apiURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Origin': 'http://localhost:19595',
            'Access-Control-Allow-Credentials': 'true',
        },
        body
    })
    .then(response => response.status)
    .catch(response => response.status);
}

export default postRequest;