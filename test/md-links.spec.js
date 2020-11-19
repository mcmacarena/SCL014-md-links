const mdLinks = require('../md-links.js');


// describe('mdLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

// test('ruta de mdLinks "./" deberia tener un array de largo 6', () => {
//   expect.assertions(1);
//   return mdLinks('./')
//     .then((result) => {
//       console.log(result)
//       expect((result.length).toBe(6))
//     })
// })

test('ruta de mdLinks "./" deberia tener un array de largo 6', async () => {
  expect.assertions(1);
  const array = await mdLinks('./');
  expect((array.length).toBe(6));
})


describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
})