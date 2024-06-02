const aiPrompt  = [
    {
      "role":"user",
      "parts":[
        {
        "text": "From next prompt I will be just providing come text or sentence or paragraph, you need to rewrite the grammar for me"}
      ]
      },
      {
        "role": "model",
        "parts":[
          {
          "text": "Sure!"}
        ]
      }
    ]

function getFixedText(text, inputField, button){
    const originalText = text;

    let data = [...aiPrompt,
        {
          "role": "user",
          "parts":[
            {
              "text": originalText}
            ]
          }
        ]
    button.textContent = "Loading...";
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDcy2aF1kneLUlagL3cVGcZV77mbNhGHsI`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: data })
    })
    .then(response => response.json())
    .then(data => {
        const fixedText = data.candidates[0].content.parts[0].text;
        // showAboveSelectedText("The Modified Text: " + fixedText);
        // copyToClipboard(fixedText);
        inputField.value = fixedText;
        button.textContent = "Fix Grammar";
    })
    .catch(error => {
        console.error("Error:", error);
        // showAboveSelectedText("The Modified Text: " + originalText);
        inputField.value = originalText;
        button.textContent = "Fix Grammar";
    });
}

(function() {
  // Find the input field
  const inputField = document.querySelector(["textarea","input[type=text]","input"]);
  console.log(inputField);
  if (inputField) {
    // Create the button element
    const fixGrammarButton = document.createElement("button");
    fixGrammarButton.textContent = "Fix Grammar";
    fixGrammarButton.id = "fix-grammar-button";

    const inputRect = inputField.getBoundingClientRect();
    
    // Style the button with some margin relative to the input field
    fixGrammarButton.style.position = "fixed"; // Adjust positioning if needed
    fixGrammarButton.style.top = (inputRect.top - 40) + "px";
    fixGrammarButton.style.left = (inputRect.left + 5) + "px";
    fixGrammarButton.style.zIndex = "9999"; // Ensure button is above other elements
    fixGrammarButton.style.backgroundColor = "#027E6F";
    fixGrammarButton.style.color = "white";
    fixGrammarButton.style.padding = "5px 10px";
    fixGrammarButton.style.borderRadius = "5px";

    // Append the button to the body (outside main HTML)
    document.body.appendChild(fixGrammarButton);

    // Add click event listener to the button
    fixGrammarButton.addEventListener("click", function() {
      const originalText = inputField.value;
      getFixedText(originalText, inputField, fixGrammarButton);
    });
  } else {
    console.log("No input field found on this page.");
  }
})();
