A simple tool to generate [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) from the [rest API](http://doc.wakanda.org/home2.en.html#/Wakanda%20Studio/0.Beta/HTTP-REST.100-808498.en.html) [catalog](http://doc.wakanda.org/home2.en.html#/Wakanda%20Studio/0.Beta/catalogall.303-817002.en.html)

## How to use

You can simply call the binary using `npx`:

```bash
npx ds-interfaces http://localhost:8081/rest/\$catalog/\$all
```

This will print the interfaces into the standard output.

You can also [redirect](https://www.guru99.com/linux-redirection.html#1) the result to save it into a specific file:

```bash
npx ds-interfaces http://localhost:8081/rest/\$catalog/\$all > wakanda.interfaces.ts
```
