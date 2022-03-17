//Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
const dolphin = (96 + 108 + 89 ) / 3;
const koala = (88 + 91 + 110 ) / 3;

const result = dolphin === koala;

if(result) {
    console.log('tie')
}
else {
    if(dolphin > koala) {
        console.log('dolphin wins')
    }
    else if(dolphin < koala) {
        console.log('koala wins')
    }
}
