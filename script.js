'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('drewniaki.json');
let drewniaki = JSON.parse(rawdata);

const statuses = {
    historical: 0,
    veryGood: 1,
    good: 2,
    moderate: 3,
    bad: 4,
    veryBad: 5,
    destroyed: 6,
    unknown: 7,
    wishToKnow: 8,
}

const Icons = {
    '#icon-1899-F57C00': statuses.bad,
    '#icon-1899-A52714': statuses.veryBad,
    '#icon-1899-0F9D58': statuses.veryGood,
    '#icon-1899-097138': statuses.veryGood,
    '#icon-1899-0288D1': statuses.unknown,
    '#icon-1899-0288D1-nodesc': statuses.unknown,
    '#icon-1899-A52714-nodesc': statuses.veryBad,
    '#icon-1842-000000': statuses.destroyed,
    '#icon-1899-E65100': statuses.bad,
    '#icon-1899-FFEA00': statuses.moderate,
    '#icon-1899-9C27B0': statuses.wishToKnow,
    '#icon-1899-000000': statuses.destroyed,
    '#icon-1899-7CB342': statuses.good,
    '#icon-1899-FBC02D': statuses.moderate, // or bad
    '#icon-1899-097138-nodesc': statuses.veryGood,
    '#icon-1899-F9A825': statuses.bad,
    '#icon-1842-000000-nodesc': statuses.destroyed,
    '#icon-1899-558B2F': statuses.good,
    '#icon-1551-FFD600': statuses.moderate,

}

const mapFeatures = (f) => ({
    name: f.properties.name,
    state: Icons[f.properties.styleUrl],
    description: f.properties.description && f.properties.description.replace(/<\/?[^>]+(>|$)/g, ""),
    photos: f.properties.gx_media_links && f.properties.gx_media_links.split(' '),
    coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]]
})
const s = new Set(drewniaki.features.map(f => f.properties.styleUrl));
const d = drewniaki.features.map(mapFeatures)

console.log(s);

fs.writeFile('drewniaki_1.json', JSON.stringify(d), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  })