import 'whatwg-fetch';

export const getAllEntries = () => {
  fetch('/api/entries').then(r => r.json())
    .then(r => console.log(r))
    .catch(e => console.log("Booo"));
};
