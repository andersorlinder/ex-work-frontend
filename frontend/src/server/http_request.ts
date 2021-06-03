async function postRequest(apiURL: string, body: string) {
    return await fetch(apiURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        },
        body,
    })
    .then(response => response.status)
    .catch(() => 500);
}

export default postRequest;