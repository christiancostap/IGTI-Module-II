import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

fs.readFile('./db/grades.json', async (err, res) => {
    const data = await JSON.parse(res);
    let teste = data.grades.indexOf({id:1})
    console.log(teste);
});

