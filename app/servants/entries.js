import 'whatwg-fetch';

export const getAllEntries = () => {
  fetch('/api/entries')
    .then(res => {
      console.log(res);
    })
};
