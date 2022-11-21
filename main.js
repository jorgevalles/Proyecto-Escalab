const URL = "https://restcountries.com/v3.1/all";

const spanError = document.getElementById("error");

const imputFilter = document.getElementById("filter");

const select = document.getElementById("mundo");

const paises = JSON.parse(localStorage.getItem("data"));

let data = paises;

const body = document.getElementById("secbody");
const bodyIndex = document.getElementById("body-index");

imputFilter?.addEventListener("input", (e) => {
  data = paises.filter((item) =>
    item.name.official.toLowerCase().includes(e.target.value.toLowerCase())
  );
  console.log(data);
  viewMore();
});

select?.addEventListener("change", (e) => {
  if (e.target.value === "Todos") {
    data = paises;
  } else {
    data = paises.filter((item) =>
      item.region.toLowerCase().includes(e.target.value.toLowerCase())
    );
  }
  viewMore();
});

async function getdata() {
  const res = await fetch(URL);
  const data = await res.json();
  localStorage.setItem("data", JSON.stringify(data));
}
getdata();

function getRegion() {
  let arr = [];
  paises?.map((item) => {
    if (!arr.includes(item.region)) {
      arr.push(item.region);
    }
    return arr;
  });
  console.log(arr);
}
getRegion();

async function viewMore() {
  const section = document.getElementById("nations");
  if (section) {
    section.innerHTML = "";

    data.forEach((country) => {
      const div = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");

      const h2 = document.createElement("h2");
      const h2Text = document.createTextNode(country.name.official);
      h2.appendChild(h2Text);
      h2.setAttribute("class", "title");
      section.appendChild(h2);
      const articles = document.createElement("section");
      const img = document.createElement("img");
      const ancord = document.createElement("a");
      // ancord.setAttribute("href", "/detalle.html");
      ancord.setAttribute("class", "carta-link");
      const btntext = document.createTextNode("ver mas");
      img.src = country.flags.png;
      ancord.appendChild(btntext);
      ancord.onclick = () =>
       { localStorage.setItem("dataCountry", JSON.stringify(country));
       console.log(body)
       body.style.display='block';
       bodyIndex.style.display='none';
      }
      img.width = 100;
      img.setAttribute("class", "carta-img");
      div3.appendChild(img);

      articles.setAttribute("class", "content");
      div2.setAttribute("class", "carta-info");
      div2.appendChild(h2);
      div2.appendChild(div3);
      div2.appendChild(ancord);
      div.appendChild(div2);
      articles.appendChild(div);
      section.appendChild(articles);
    });
  }
}
viewMore();
function viewNations(country) {
  const section = document.getElementById("detalle");
  if (section) {
    const country = JSON.parse(localStorage.getItem("dataCountry"));
    console.log(country);
    section.innerHTML = "";
    const div = document.createElement("div");
    const div2 = document.createElement("div");

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode(country.name.official);
    h2.appendChild(h2Text);
    const h22 = document.createElement("h2");
    const h2Text2 = document.createTextNode(`Capital: ${country.capital[0]}`);
    h22.appendChild(h2Text2);
    const h23 = document.createElement("h2");
    const h2Text3 = document.createTextNode(`Region: ${country.region}`);
    h23.appendChild(h2Text3);
    const h24 = document.createElement("h2");
    const h2Text4 = document.createTextNode(`Población: ${country.population}`);
    h24.appendChild(h2Text4);

    section.appendChild(h2);

    const articles = document.createElement("section");
    const img = document.createElement("img");
    const ancord = document.getElementById("button");
    img.src = country.flags.png;
    img.width = 500;
    img.setAttribute("class", "carta-img");

    ancord.onclick = () =>{
      body.style.display='none';
      bodyIndex.style.display='block';
    };

    body.style.backgroundImage = `url(${country.flags.png})`;
    body.style.backgroundRepeat = `no-repeat`;
    body.style.backgroundSize = `100%`;

    body.style.backgroundPosition = `center`;

    div.setAttribute("class", "cart");
    // div2.setAttribute('class','carta-info')

    div2.appendChild(h2);
    div2.appendChild(h22);
    div2.appendChild(h23);
    div2.appendChild(h24);

    div2.appendChild(img);

    div.appendChild(div2);
    articles.appendChild(div);
    section.appendChild(articles);
  }
}
viewNations();
