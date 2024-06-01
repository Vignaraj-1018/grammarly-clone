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

function getFixedText(text){
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
        showAboveSelectedText("The Modified Text: " + fixedText);
        copyToClipboard(fixedText);
    })
    .catch(error => {
        console.error("Error:", error);
        showAboveSelectedText("The Modified Text: " + originalText);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard:", text);
    }).catch(error => {
        console.error("Error copying text to clipboard:", error);
    });
}
  
function showAboveSelectedText(text) {
    const floatingText = document.createElement("div");
    floatingText.textContent = text;
    floatingText.style.position = "absolute";
    floatingText.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    floatingText.style.border = "1px solid #ccc";
    floatingText.style.padding = "5px";
    floatingText.style.zIndex = "9999";
    floatingText.style.color = "#000";

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const boundingRect = range.getBoundingClientRect();

        floatingText.style.top = (boundingRect.top - floatingText.offsetHeight - boundingRect.height) + "px";
        floatingText.style.left = boundingRect.left + "px";

        document.body.appendChild(floatingText);

        document.body.addEventListener("mousedown", function removeFloatingText() {
            if (floatingText && floatingText.parentNode) {
                floatingText.parentNode.removeChild(floatingText);
                document.body.removeEventListener("mousedown", removeFloatingText);
            }
        });
    }
}

document.addEventListener("mouseup", function() {
    const selectedText = window.getSelection().toString().trim();
    console.log(selectedText);
    if (selectedText !== "") {
        getFixedText(selectedText);
    }
});
