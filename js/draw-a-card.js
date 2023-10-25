const apiUri = 'http://deckofcardsapi.com/api/';

let container;
export default function setInterface(container_) {
    container = container_;
    container.innerHTML = createInterface();

    const drawButton = container.querySelector('#draw');
    const imageContainer = container.querySelector('#image-container');

    drawButton.addEventListener('click', function (e) {
        imageContainer.innerHTML = '';
        imageContainer.classList.add('placeholder', 'col-1');

        const cardImage = document.createElement('img');
        cardImage.classList.add('img-fluid');
        cardImage.addEventListener('load', (e) => imageContainer.classList.remove('placeholder', 'col-1'));

        getACard((data) => {
            cardImage.setAttribute('src', data.src);
            cardImage.setAttribute('alt', data.alt);
            imageContainer.appendChild(cardImage);
        });
    });
}

function createInterface() {
    return `<div class="row">
    <div class="col-auto">
        <button type="button" id="draw" class="btn btn-secondary input-group-text rounded mt-3">Draw
            card</button>
    </div>
</div>
<div class="row">
    <div class="col-auto">
        <div id="image-container" class="mt-3" style="max-width: 226px;">
        </div>
    </div>
</div>`;
}

function getACard(cb) {
    const fullUri = `${apiUri}deck/new/draw/?count=1`;
    fetch(fullUri)
        .then(res => res.json())
        .then(data => {
            cb(getImageSrc(data));
        })
        .catch(err => {
            console.log(err);
        });
}

function getImageSrc(data) {
    /* fetch example
        {
            "success": true,
            "deck_id": "xlgq6q98kkz1",
            "cards": [
                {
                    "code": "6H",
                    "image": "https://deckofcardsapi.com/static/img/6H.png",
                    "images": {
                        "svg": "https://deckofcardsapi.com/static/img/6H.svg",
                        "png": "https://deckofcardsapi.com/static/img/6H.png"
                    },
                    "value": "6",
                    "suit": "HEARTS"
                }
            ],
            "remaining": 51
        }
    */

    const src = data.success ? 
    {
        src : data.cards[0].image,
        alt : `${data.cards[0].value} ${data.cards[0].suit}`
    } 
    : {
        src : '',
        alt : ''
    } ;
    return src;
}