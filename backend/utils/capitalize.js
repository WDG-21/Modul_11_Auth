export default function capitalize(str) {
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
    words[i] = word;
  }
  return words.join(' ');
}

// const input = 'hello world!';
// const expected = 'Hello World!';

// const actual = capitalize(input);
// if (actual === expected) console.log('Funktion funktioniert');
