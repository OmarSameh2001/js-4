var interval = null;
function showImage(image) {
    let imgs = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
    let i = 0;
    interval = setInterval(() => {
        image.src = imgs[i];
        i = i === imgs.length-1 ? 0 : (i + 1);
    }, 1000);
}

function firstImage(image) {
    clearInterval(interval);
    image.src = "img1.jpg";
}

fetch("https://gist.githubusercontent.com/OmarSameh2001/8eb7b429acbad3337ba0e51591c865f4/raw/79001c5e8b3bf7072cf217a1bc4dd904c52a44c1/names.json")
  .then(response => response.json())
  .then(data => {
    console.log(JSON.stringify(data));
    var select = document.querySelector("select");
    data.forEach(person => {
        var option = document.createElement("option");
        option.value = person.name;
        option.textContent = person.name;
        select.appendChild(option);
    });
    select.addEventListener("change", function () {
        var details = document.getElementById("details");
        details.innerHTML = "";
        let selectedPerson = data.find(person => person.name === select.value);
        if (selectedPerson) {
          let personDetails = `
            <p>Age: ${selectedPerson.age}</p>
            <p>Email: ${selectedPerson.email}</p>
            <p>Phone: ${selectedPerson.phone}</p>
            <p>Address: ${selectedPerson.address}</p>
          `;
          details.innerHTML = personDetails;
        }
      });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
