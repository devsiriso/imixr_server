

const handleSubmit = () => {
    event.preventDefault();
    let form = document.querySelector('form');
    let rawData = new FormData(form);
    let parsedData = {};
    for (let [key, value] of rawData) {
        parsedData[key] = value;
    }
    postData(parsedData);
}

const fillTable = (object) => {
    let table = document.querySelector('table');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = object.id;
    cell2.innerHTML = object.name;
    cell3.innerHTML = object.data;
}

const clearTable = () => {
    let table = document.querySelector('table');
    while(table.rows.length > 1) {
        table.deleteRow(-1);
    }
}

const refreshTable = () => {
    clearTable();
    getData();
}

const postData = (data) => {
    fetch('http://206.189.7.100:8080/objects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(r => {
            clearTable();
            getData();
        })
        .catch(e => console.log(e))
}

const getData = () => {
    fetch('http://206.189.7.100:8080/objects')
        .then(res => res.json()).then(data => {
            data.reverse();
            data.forEach(object => {
                fillTable(object);
            });
        })
        .catch(e => console.log(e))
}

const deleteData = () => {
    fetch('http://206.189.7.100:8080/objects', {
        method: 'DELETE',
    })
        .then(res => {
            clearTable();
        })
        .then(res => console.log(res))
}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    getData();
});

