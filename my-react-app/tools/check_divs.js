const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'UsuariosRegistrados.jsx');
const s = fs.readFileSync(file, 'utf8');
const lines = s.split('\n');
let stack = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const openRegex = /<div\b[^>]*>/g;
  let m;
  while ((m = openRegex.exec(line)) !== null) {
    stack.push({ line: i + 1, snippet: line.trim() });
  }
  const closeRegex = /<\/div>/g;
  while ((m = closeRegex.exec(line)) !== null) {
    if (stack.length) stack.pop(); else console.log('Unmatched closing </div> at line', i+1);
  }
}
if (stack.length) {
  console.log('Unclosed <div> openings (most recent first):');
  stack.slice().reverse().forEach(s => console.log('  line', s.line, ':', s.snippet));
} else {
  console.log('All divs balanced');
}
