import { signal } from '@preact/signals';

const mcount = signal(0);
const scount = signal(0);
const flag = signal(false);

function f() {
  console.log(Object.defineProperties(new Error, {
    message: {
      get() {
        flag.value = true;
        mcount.value++;
        console.log("message", new Date());
        return "overridden message " + new Date();
      }
    },
    toString: {
      value() {
        scount.value++;
        console.log("toString", new Date());
        return "overridden toString " + new Date();
      }
    }
  }))
}
f();

export function App() {
  return (
    <>
      <h1>Is DevTools on? {flag.value ? "yes" : "no"}</h1>
      <p># of message called: {mcount}</p>
      <p># of toString called: {scount}</p>
    </>
  )
}
