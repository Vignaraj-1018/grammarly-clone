function getFixedText(text, inputField, button){
    const originalText = text;
    button.textContent = "Loading...";
    fetch(`https://helper-api-vignu.el.r.appspot.com/grammarly/fix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        const fixedText = data.result;
        inputField.value = fixedText;
        button.textContent = "Fix Grammar";
    })
    .catch(error => {
        console.error("Error:", error);
        inputField.value = originalText;
        button.textContent = "Fix Grammar";
    });
}

(function() {
  const inputField = document.querySelector(["textarea","input[type=text]","input"]);
  // console.log(inputField);
  if (inputField) {
    const fixGrammarButton = document.createElement("button");
    fixGrammarButton.textContent = "Fix Grammar";
    fixGrammarButton.id = "fix-grammar-button";
    const inputRect = inputField.getBoundingClientRect();
    fixGrammarButton.style.position = "fixed";
    fixGrammarButton.style.top = (inputRect.top - 40) + "px";
    fixGrammarButton.style.left = (inputRect.left + 5) + "px";
    fixGrammarButton.style.zIndex = "9999";
    fixGrammarButton.style.backgroundColor = "#027E6F";
    fixGrammarButton.style.color = "white";
    fixGrammarButton.style.padding = "5px 10px";
    fixGrammarButton.style.borderRadius = "5px";
    document.body.appendChild(fixGrammarButton);
    fixGrammarButton.addEventListener("click", function() {
      const originalText = inputField.value;
      getFixedText(originalText, inputField, fixGrammarButton);
    });
  } else {
    console.log("No input field found on this page.");
  }
})();
