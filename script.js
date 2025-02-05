let xpPlayer = 20;
let healthPlayer = 40;
let coinPlayer = 100;
let xpMonster = 0;
let healthMonster = 0;
let lvlMonster = 0;
let namaMonster
let inventory = ['tangan kosong'];

const title = document.querySelector('#title');
const text = document.querySelector('#text');
const xpPlayerText = document.querySelector('.xp-player-text');
const healthPlayerText = document.querySelector('.health-player-text');
const coinPlayerText = document.querySelector('.coin-player-text');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const monsterStat = document.querySelector('.monster');
const xpMonsterText = document.querySelector('.xp-monster-text');
const healthMonsterText = document.querySelector('.health-monster-text');
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
        nama: 'Battle',
        text: 'Ayo lawan monsternya!',
        'button text': ['Serang', 'Menghindar', 'LARI!!!'],
        'button function': [attack, dodge, tamanKota]
    },
    {
        nama: 'WIN',
        text: 'Kamu menang!',
        'button text': ['Taman Kota', 'Taman Kota', 'Taman Kota'],
        'button function': [tamanKota, tamanKota, tamanKota]
    },
    {
        nama: 'WINNER',
        text: 'Kamu BERHASIL!',
        'button text': ['Ulangi', 'Ulangi', 'Ulangi'],
        'button function': [tamanKota, tamanKota, tamanKota]
    },
    {
        nama: 'LOSE',
        text: 'Kamu Kalah!',
        'button text': ['Taman Kota', 'Taman Kota', 'Taman Kota'],
        'button function': [tamanKota, tamanKota, tamanKota]
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

const monsters = [
    {
        nama: 'serangga',
        lvl: 1,
        xp: 20,
        health: 120
    },
    {
        nama: 'singa',
        lvl: 2,
        xp: 50,
        health: 200
    },
    {
        nama: 'naga',
        lvl: 3,
        xp: 100,
        health: 300
    }
]

button1.onclick = toko;
button2.onclick = goa;
button3.onclick = lawanNaga;

function update(locations) {
    monsterStat.style.display = "none";
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
    fight(monsters[2]);
}

function buyHealth() {
    if (coinPlayer >= 20) {

        coinPlayer = coinPlayer - 20;
        healthPlayer += 10;

        coinPlayerText.innerText = coinPlayer;
        healthPlayerText.innerText = healthPlayer;
        text.innerText = 'Kamu berhasil menambahkan health kamu.'
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

function lawanSerangga() {
    update(locations[3]);
    fight(monsters[0]);
}

function lawanSinga() {
    update(locations[3]);
    fight(monsters[1]);
}

function fight(monsters) {
    namaMonster = monsters.nama;
    monsterStat.style.display = "flex";
    xpMonsterText.innerText = monsters.xp;
    healthMonsterText.innerText = monsters.health;
    xpMonster = monsters.xp;
    healthMonster = monsters.health;
    lvlMonster = monsters.lvl;
}

function attack() {
    if (healthPlayer > 0 && healthMonster > 0) {
        roulete();
    } else if (healthPlayer > 0 && healthMonster <= 0) {
        if (lvlMonster < 3) {
            update(locations[4]);
            text.innerText = 'Kamu menang! \n Kamu mengalahkan ' + namaMonster + 'Coin dan health kamu bertambah.'

            xpPlayer += xpMonster;
            coinPlayer += lvlMonster * 50;

            xpPlayerText.innerText = xpPlayer;
            coinPlayerText.innerText = coinPlayer;
        } else {
            update(locations[5]);
            text.innerText = 'Kamu berhasil mengalahkan Naga. Kamu adalah sang pendekar. \n SELAMAT!'
        }
    } else //if (healthPlayer > 0 && healthMonster <= 0)//
    {
        update(locations[6])
    }
}

function dodge() {
    text.innerText = 'Kamu menghindar!';
}

function roulete() {
    let mat = Math.random();
    console.log(mat);
    if (mat <= 0.3) {
        miss();
    } else (
        hit()
    )
}

function hit() {
    console.log('hit');
    healthMonster = healthMonster - xpPlayer;
    healthPlayer = healthPlayer - xpMonster/2;

    healthMonsterText.innerText = healthMonster;
    healthPlayerText.innerText = healthPlayer;
    text.innerText = 'Kamu menyerang ' + namaMonster + ' menggunakan ' + weapons[inventory.length - 1].nama + '.';
}

function miss() {
    console.log('miss');
    healthPlayer -= xpMonster;
    healthPlayerText.innerText = healthPlayer;
    text.innerText = 'Seranganmu meleset! Kamu terkena serangan ' + namaMonster + '.'
}