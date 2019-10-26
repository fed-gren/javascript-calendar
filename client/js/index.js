const a = 1;

const fn = (...rest) => {
  for(let v of rest) {
    console.log(v);
  }
}

fn(1,2,3,4,5);