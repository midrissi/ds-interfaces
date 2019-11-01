const { renderString } = require('nunjucks');
const { readFile } = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');
const request = require('request');

const readFile$ = promisify(readFile);
const request$ = promisify(request);
let tpl;

function transform(attr, dataClasses) {
  const res = attr;

  switch (true) {
    case attr.type === 'blob':
    case attr.type === 'image':
      res.type = 'Media';
      break;
    case attr.type === 'bool':
      res.type = 'boolean';
      break;
    case attr.type === 'object':
      res.type = 'any';
      break;
    case attr.kind === 'relatedEntity':
      res.type = `I${res.type}`;
      break;
    case attr.kind === 'relatedEntities': {
      const dataClass = dataClasses.find(one => one.collectionName === attr.type);

      res.type = `Collection<I${dataClass.name}>`;
      break;
    }
    case attr.type === 'date':
      res.type = 'Date';
      break;
    case attr.type === 'byte':
    case attr.type === 'long':
    case attr.type === 'long64':
    case attr.type === 'number':
    case attr.type === 'word':
      res.type = 'number';
      break;
    default:
      res.type = 'string';
      break;
  }

  return res;
}

exports.getInterfaces = async (url = 'http://localhost:8081/rest/$catalog/$all') => {
  if (!tpl) {
    try {
      const tplPath = resolve(__dirname, '../templates/ds.interfaces.njk');
      tpl = await readFile$(tplPath, { encoding: 'utf8' });
    } catch (e) {
      return '';
    }
  }
  try {
    const result = await request$({
      url,
      json: true,
    });
    const dataclasses = result.body.dataClasses.map(dc => ({
      ...dc,
      keyType: !(Array.isArray(dc.key) && dc.key[0])
        ? 'string'
        : transform(dc.attributes.find(attr => attr.name === dc.key[0].name), result.body.dataClasses).type,
      attributes: dc.attributes.map(attr => transform(attr, result.body.dataClasses)).filter(Boolean),
    }));
    return renderString(tpl, { dataclasses });
  } catch (e) {
    return '';
  }
};
