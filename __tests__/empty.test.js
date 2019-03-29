const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('Empty test', () => {
  it('true to be true', async () => {
    expect(true).to.equal(true);
  });
});
