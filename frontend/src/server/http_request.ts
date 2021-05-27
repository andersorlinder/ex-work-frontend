async function postRequest(apiURL: string, body: string) {
    return await fetch(apiURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body
    })
    .then(response => response.status)
    .catch(response => response.status);
}

export default postRequest;