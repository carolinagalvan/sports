function displaySportList(data){
    console.log(data);
    for(let i = 0; i< data.sports.length; i++){
        $('#sports').append(`
            <li>${data.sports[i].name}</li>
        `)
    }
}

function onload(){
    let url = "./sports/api/list-sports";
    let settings = {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw Error(response.statusText);
        })
        .then(responseJSON => {
            displaySportList(responseJSON);
        });
}

$(onload);