const messageInput = document.getElementById("messageInput");
const messageBox = document.getElementById('messageBox');

const region = document.getElementById('region')
const population = document.getElementById('population');
const capitalCity = document.getElementById('capitalCity')


let text = '';

function appendMessage(){
    if (messageInput.value.length > 27) {
      alert("Allowed number of letters 27");
      messageInput.value = "";
    } else if (messageInput.value == "") {
      alert("Please Enter Message");
    } else {
      let newMessageContainer = document.createElement('p')
      newMessageContainer.classList.add('newMessageContainer');
      text = messageInput.value;
      let textContainer = document.createTextNode(text);
      newMessageContainer.appendChild(textContainer);
      messageBox.appendChild(newMessageContainer);
      messageInput.value = "";
    };
    getInfo();
};

async function getInfo() {
  let resp = await fetch("https://restcountries.com/v3.1/all");
  let content = await resp.json();

  let key;

  for (key in content) {
    let countries = content[key].name.common;
    let arrCountries = [countries];
    if (arrCountries.includes(text, 0)) {
      let populationParagraph = document.createElement('p');      
      let regionParagraph = document.createElement('p');
      let capitalParagraph = document.createElement('p');
      
      let popul = content[key].population;
      let reg = content[key].region;
      let capital = content[key].capital;

      regionParagraph.innerText = "region: " + reg;
      regionParagraph.classList.add('region');


      populationParagraph.innerText = "population: " + popul;
      populationParagraph.classList.add('population');

      capitalParagraph.innerText = "capital: " + capital;
      capitalParagraph.classList.add('capital-city');

      messageBox.appendChild(populationParagraph);
      messageBox.appendChild(regionParagraph);
      messageBox.appendChild(capitalParagraph);
    
   }
  }
};

document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter') {
    appendMessage();
  };
});