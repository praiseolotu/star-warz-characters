
fetch("https://swapi.dev/api/people", {
    method: 'GET',
    headers: {
        'Content-Type': "application / json"
    }
})
    .then(res => res.json())
    .then(data => console.log(data))