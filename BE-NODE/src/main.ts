import * as fs from 'fs';

// console.log(add(2,2));

fs.writeFile('text.txt', 'Content.', (err) => {
  if (err) throw err;
  console.log('File created.');
}); 