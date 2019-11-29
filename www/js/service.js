const ENDPOINT = 'http://localhost/api/misdatos';
//call API functions
function getOnDataBase() {
    return fetch(ENDPOINT).then(res => res.json());
}

function postOnDataBase(newTask) {
    // post body data 
    const listItem = {
        task: newTask,
        checked: false
    };
    // request options
    const options = {
        method: 'POST',
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send POST request   
    return fetch(ENDPOINT, options)
        .then(res => {
            return res.json();
        });
}

function patchOnDatabase(id, bool) {
    // patch body data 
    const listItem = {
        _id: id,
        checked: bool
    };
    // request options
    const options = {
        method: 'PATCH',
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send PATCH request   
    fetch(ENDPOINT, options)
        .then(res => {
            console.log(`PATCH result: ${res.ok}`)
        });
}

function deleteOnDatabase(id) {
    // delete body data 
    const listItem = {
        _id: id,
    };
    // request options
    const options = {
        method: 'DELETE',
        body: JSON.stringify(listItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send DELETE request   
    return fetch(ENDPOINT, options)
        .then(res => {
            console.log(`DELETE result: ${res.ok}`)
        });
}

function deleteManyDatabase() {

    // request options
    const options = {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // send DELETE request   
    return fetch('http://localhost/api/misdatos/delete', options)
        .then(res => {
            console.log(`DELETEMANY result: ${res.ok}`)
        });
}

export {deleteManyDatabase, deleteOnDatabase, patchOnDatabase, postOnDataBase, getOnDataBase};