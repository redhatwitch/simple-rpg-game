let xpPlayer = 50;
let healthPlayer = 0;
let coinPlayer = 100;
let inventory = ['tangan kosong'];

const title = document.querySelector('#title');
const text = document.querySelector('#text');
const xpPlayerText = document.querySelector('.xp-player-text');
const healthPlayerText = document.querySelector('.health-player-text');
const coinPlayerText = document.querySelector('.coin-player-text');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const locations = [
    {
        nama: 'TAMAN KOTA',
        text: 'Selamat kembali ke taman kota.',
        'button text': ['Toko', 'Goa', 'Lawan Naga'],
        'button function': [toko, goa, lawanNaga]
    },
    {
        nama: 'TOKO',
        text: 'Selamat datang di Toko. Silahkan pilih belanjaan anda.',
        'button text': ['Beli Health (20 coin)', 'Beli Senjata (20 coin)', 'Taman Kota'],
        'button function': [buyHealth, buyWeapon, tamanKota]
    },
    {
        nama: 'GOA',
        text: 'Selamat datang di GOA. Tempat ini adalah tempat anda berlatih.',
        'button text': ['Lawan Serangga', 'Lawan Singa', 'Taman Kota'],
        'button function': [lawanSerangga, lawanSinga, tamanKota]
    },
    {
        nama: 'LEVEL BOS!',
        text: 'Kamu sedang melawan bos tertinggi: Naga.',
        'button text': ['Serang', 'Menghindar', 'LARI!!!'],
        'button function': [lawanSerangga, lawanSinga, tamanKota]
    }
]

const weapons = [
    {
        nama: 'tangan kosong',
        xp: 0
    },
    {
        nama: 'ketapel',
        xp: 10
    },
    {
        nama: 'pisau',
        xp: 20
    },
    {
        nama: 'pedang',
        xp: 30
    }
]

button1.onclick = toko;
button2.onclick = goa;
button3.onclick = lawanNaga;

function update(locations) {
    title.innerText = locations.nama;
    text.innerText = locations.text;
    button1.innerText = locations['button text'][0]; 
    button2.innerText = locations['button text'][1]; 
    button3.innerText = locations['button text'][2];
    button1.onclick = locations['button function'][0];
    button2.onclick = locations['button function'][1];
    button3.onclick = locations['button function'][2];
}

function tamanKota() {
    update(locations[0]);
}

function toko() {
    update(locations[1]);
}

function goa() {
    update(locations[2]);
}

function lawanNaga() {
    update(locations[3]);
}

function buyHealth() {
    if (coinPlayer >= 20) {

        coinPlayer = coinPlayer - 20;
        healthPlayer += 10;

        coinPlayerText.innerText = coinPlayer;
        healthPlayerText.innerText = healthPlayer;
    } else {
        text.innerText = 'Coin kamu telah habis.'
    };
}

function buyWeapon() {
    if (coinPlayer >= 20) {

        if (inventory.length !== weapons.length) {
            coinPlayer = coinPlayer - 20;
            inventory.push(weapons[inventory.length].nama);
            
            xpPlayer += weapons[inventory.length - 1].xp;
            
            xpPlayerText.innerText = xpPlayer;
            coinPlayerText.innerText = coinPlayer;
            text.innerText = 'Kamu berhasil membeli ' + weapons[inventory.length - 1].nama + '.';
            text.innerText += '\n \n Senjata kamu sekarang: ' + inventory + '.';

        } else {
            text.innerText = 'Kamu telah memiliki senjata terkuat.'
        }
    } else {
        text.innerText = 'Coin kamu telah habis.'
    };
}



function lawanSerangga() {}

function lawanSinga() {}

