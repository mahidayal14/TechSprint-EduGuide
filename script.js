async function askAI() {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer");

  answer.innerText = "Thinking...";

  try {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    answer.innerText = data.reply;
  } catch (err) {
    answer.innerText = "Server not running";
  }
}