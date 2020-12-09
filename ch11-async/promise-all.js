/*
 * Given an array of promises, Promise.all returns a promise that waits for all of
 * the promises in the array to finish. It then succeeds, yielding an array of
 * result values. If a promise in the array fails, the promise returned by all
 * fails too, with the failure reason from the failing promise.
 * 
 * Implement something like this yourself as a regular function called Promise_all.
 * 
 * Remember that after a promise has succeeded or failed, it can’t succeed or fail
 * again, and further calls to the functions that resolve it are ignored. This can
 * simplify the way you handle failure of your promise.
 */


function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let resultsArray = [];
        let counter = promises.length;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                resultsArray[i] = result;
                counter--;
                if (counter == 0) resolve(resultsArray);
            }, reject);
        }
        if (promises.length == 0) resolve(resultsArray);
    });
}

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
