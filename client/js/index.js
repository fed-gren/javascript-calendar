import '../css/style.scss';

const a = 1;

const fn = (...rest) => {
  for(let v of rest) {
    console.log(v);
  }
}

fn(1,2);