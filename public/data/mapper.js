const fs = require('fs');
const Data = require("./test.json");

console.log("Before is",  Data.features.length);

Data.features = Data.features.filter(f => {
 const VOTES = f.properties.VOTES;
 if (!VOTES) return false;
 const { percentage20_Donald_Trump, percentage20_Joe_Biden } = VOTES;
 return Number(percentage20_Donald_Trump) && Number(percentage20_Joe_Biden);
});

console.log("After is",  Data.features.length);
fs.writeFileSync('next.json', JSON.stringify(Data), 'utf-8');