// Function to create a promise that resolves after given seconds
function createPromise(name, timeInSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, timeInSeconds }), timeInSeconds * 1000);
  });
}

// Create the three promises
const promise1 = createPromise("Promise 1", 1);
const promise2 = createPromise("Promise 2", 2);
const promise3 = createPromise("Promise 3", 3);

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
  const output = document.getElementById("output");

  // Append each promise result to the table
  results.forEach((result) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.timeInSeconds}</td>
    `;

    output.appendChild(row);
  });
});

