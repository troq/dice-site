 const variance = (arr = []) => {
   const sum = arr.reduce((acc, val) => acc + val);
   const { length: num } = arr;
   const median = sum / num;
   let v = 0;
   arr.forEach(num => {
      v += ((num - median) * (num - median));
   });
   v /= num;
   return v;
};

 const isAscending = (arr = []) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i-1]) {
      return false;
    }
  }
  return true;
}

 const isDescending = (arr = []) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i-1]) {
      return false;
    }
  }
  return true;
}

 const isSawtooth = (arr = []) => {
  let prevDelta = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    let currentDelta = arr[i] - arr[i-1];
    if (prevDelta * currentDelta >= 0) {
      return false;
    }
    prevDelta = currentDelta;
  }
  return true;
}

 const highestIndex = (arr = []) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

 const lowestIndex = (arr = []) => {
  if (arr.length === 0) {
    return -1;
  }

  var min = arr[0];
  var minIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      minIndex = i;
      min = arr[i];
    }
  }

  return minIndex;
}
let data = require('./db.json');
let r = />(\d+)</g;
let rId = /#(\d+)$/;
let annotatedData = data.URIs.map(d => {
  let buf = new Buffer(d.slice(29), 'base64');
  let parsed = JSON.parse(buf.toString('ascii'));
  let imgBuf = new Buffer(parsed.image.slice(21), 'base64');

  parsed.id = parseInt(parsed.name.match(rId)[1], 10);
  parsed.image = imgBuf.toString().slice(2);
  parsed.values = [...parsed.image.matchAll(r)].map(a => parseInt(a[1], 10))

  if (parsed.values.length !== 6 || parsed.values.reduce((a,b) => a+b, 0) !== 100) {
    throw 'issue';
  }

  parsed.isAscending = isAscending(parsed.values);
  parsed.isDescending = isDescending(parsed.values);
  parsed.isSawtooth = isSawtooth(parsed.values);
  parsed.highestSide = highestIndex(parsed.values)+1;
  parsed.lowestSide = lowestIndex(parsed.values)+1;
  parsed.variance = variance(parsed.values);
  return parsed;
});

let stats = {
  ascendingCount: annotatedData.filter(d => d.isAscending).length,
  descendingCount: annotatedData.filter(d => d.isDescending).length,
  sawtoothCount: annotatedData.filter(d => d.isSawtooth).length,
}

for (let i = 1; i <= 6; i++) {
  stats[`high${i}`] = annotatedData.filter(d => d.highestSide === i).length;
  stats[`low${i}`] = annotatedData.filter(d => d.lowestSide === i).length;
}

console.log(JSON.stringify({annotatedData, stats}));
