import setStarWarsInterface from "./star-wars-biometrics.js";
import setDrawACardInterface from "./draw-a-card.js";

const subDoc = document.querySelector('#main-container');
const select = document.querySelector('#functionality');

setStarWarsBiometrics();

select.addEventListener('change', function (e) {
    const value = this.value;

    switch (value) {
        case 'swb':
            setStarWarsBiometrics();
            break;
        case 'dac':
            setDrawACard();
            break;
    }
});


function setStarWarsBiometrics(){
    setStarWarsInterface(subDoc);
}

function setDrawACard(){
    setDrawACardInterface(subDoc);
}