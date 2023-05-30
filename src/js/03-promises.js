  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(document.querySelector('input[name="delay"]').value);
    const step = parseInt(document.querySelector('input[name="step"]').value);
    const amount = parseInt(document.querySelector('input[name="amount"]').value);

    for (let i = 0; i < amount; i++) {
      createPromise(i, delay + step * i)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
32323



