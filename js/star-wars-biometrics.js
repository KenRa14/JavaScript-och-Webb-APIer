const apiUri = 'https://www.swapi.tech/api/';


let container;
export default function setInterface(container_) {
    container = container_;
    container.innerHTML = createInterface();

    const searchField = container.querySelector('#name');
    const searchButton = container.querySelector('#search');
    const outputArea = container.querySelector('#output-person-info');

    searchButton.addEventListener('click', function (e) {
        if (searchField.value === '') {
            outputArea.value = '';
            return;
        }
        getStarWarsPersonInfo(searchField.value, (data) => outputArea.value = formatPersonInfo(data));
    });
}

function createInterface() {
    return `<div class="row">
    <div class="col">
        <h1 class="h3 fw-light mt-3">Search Star Wars people</h1>
        <div class="card bg-body-tertiary" style="max-width: 350px;">
            <div class="card-body">
                <div class="row align-items-center px-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" placeholder="e.g. r2" id="name">
                    <button type="button" id="search"
                        class="btn btn-secondary input-group-text rounded mt-3">Search</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <h2 id="output-title" class="h4 fw-light mt-3">Info</h2>
        <textarea id="output-person-info" rows="5" class="w-100" style="max-width: 680px;"></textarea>
    </div>
</div>`;
}

function getStarWarsPersonInfo(name, cb) {
    const fullUri = `${apiUri}people/?name=${name}`;

    fetch(fullUri)
        .then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => {
            console.log(err);
        });
}

function formatPersonInfo(data) {
    /* fetch example
        {
        "message": "ok",
            "result": [
                {
                    "properties": {
                        "height": "96",
                        "mass": "32",
                        "hair_color": "n/a",
                        "skin_color": "white, blue",
                        "eye_color": "red",
                        "birth_year": "33BBY",
                        "gender": "n/a",
                        "created": "2023-10-24T04:34:41.546Z",
                        "edited": "2023-10-24T04:34:41.546Z",
                        "name": "R2-D2",
                        "homeworld": "https://www.swapi.tech/api/planets/8",
                        "url": "https://www.swapi.tech/api/people/3"
                    },
                    "description": "A person within the Star Wars universe",
                    "_id": "5f63a36eee9fd7000499be44",
                    "uid": "3",
                    "__v": 0
                }
            ]
        }
    */

    if(data.message !== 'ok') {
        return `message: ${data.message}`;
    }

    let output = data.result.map((v) => `Name: ${v.properties.name}\nHeight: ${v.properties.height}, mass: ${v.properties.mass}, gender: ${v.properties.gender}, hair color: ${v.properties.hair_color}`).join("\n\n");

    if (output === '') {
        output = 'Not found';
    }

    return output;
}

