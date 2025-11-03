document.getElementById("clientForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = document.getElementById("clientForm");
  const canvas = await html2canvas(form);
  const imageData = canvas.toDataURL("image/png");

  const formData = {
    image: imageData
  };

  const response = await fetch("http://localhost:3000/send-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.text();
  alert(result);
});
