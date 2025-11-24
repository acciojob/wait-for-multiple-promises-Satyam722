const output = document.getElementById("output");

// Add default Loading row (ID MUST MATCH Cypress)
const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
loadingRow.innerHTML = `
  <td colspan="2" class="text-center fw-bold">Loading...</td>
`;
output.appendChild(loadingRow);

// Function to create random delay promise
function createPromise(id) {
  const time = Math.random() * 2 + 1; // 1–3 sec
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, time }), time * 1000);
  });
}

const p1 = createPromise(1);
const p2 = createPromise(2);
const p3 = createPromise(3);

const startTime = performance.now();

Promise.all([p1, p2, p3]).then((results) => {
  // Remove loading row
  document.getElementById("loading").remove();

  // Append promise rows
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${res.id}</td>
      <td>${res.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalTime = (performance.now() - startTime) / 1000;

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});
