//your JS code here. If required.
// Get table body
const output = document.getElementById("output");

// Add default Loading row
const loadingRow = document.createElement("tr");
loadingRow.id = "loading-row";
loadingRow.innerHTML = `
  <td colspan="2" class="text-center fw-bold">Loading...</td>
`;
output.appendChild(loadingRow);

// Function to create a promise with random delay (1–3 seconds)
function createPromise(id) {
  const time = Math.random() * 2 + 1; // 1–3 sec

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, time });
    }, time * 1000);
  });
}

// Create 3 promises
const p1 = createPromise(1);
const p2 = createPromise(2);
const p3 = createPromise(3);

// Capture start time for total measurement
const startTime = performance.now();

// Resolve all promises
Promise.all([p1, p2, p3]).then((results) => {
  // Remove loading row
  document.getElementById("loading-row").remove();

  // Add each promise result
  results.forEach((res) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>Promise ${res.id}</td>
      <td>${res.time.toFixed(3)}</td>
    `;

    output.appendChild(row);
  });

  // Calculate total time (until all promises resolved)
  const totalTime = (performance.now() - startTime) / 1000;

  // Add total row
  const totalRow = document.createElement("tr");

  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;

  output.appendChild(totalRow);
});
