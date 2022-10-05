const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_RxGOXR4gBPw0zxHL0ZqMwaCXjuDSNpVif2bw8igbOT5mn8fMP2Ld6wG8wAeUwe6N";
// limit=3 es un query parameters, estamos limitando la cantidad de imagenes
const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites/?api_key=live_RxGOXR4gBPw0zxHL0ZqMwaCXjuDSNpVif2bw8igbOT5mn8fMP2Ld6wG8wAeUwe6N";
const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_RxGOXR4gBPw0zxHL0ZqMwaCXjuDSNpVif2bw8igbOT5mn8fMP2Ld6wG8wAeUwe6N`;

const spanError = document.getElementById("error");

async function loadRandomImg() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error" + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    btn1.onclick = () => saveFavouriteImg(data[0].id);
    btn2.onclick = () => saveFavouriteImg(data[1].id);
    btn3.onclick = () => saveFavouriteImg(data[2].id);
  }
}

async function loadFavouritesImg() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("favorites");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error" + res.status + data.message;
  } else {
    const section = document.getElementById("favoritesDogs");
    section.innerHTML = "";

    data.forEach((dog) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");

      img.src = dog.image.url;
      img.width = 300;
      img.classList.add("img-favorite");
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteImg(dog.id);
      btn.classList.add("btn-take");
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteImg(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error" + res.status + data.message;
  } else {
    console.log("Img guardada en favoritos");
    loadFavouritesImg();
  }
}

async function deleteFavouriteImg(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error" + res.status + data.message;
  } else {
    console.log("Img eliminada de favoritos");
    loadFavouritesImg();
  }
}

loadRandomImg();
loadFavouritesImg();

// const buttonNext = document.querySelector('#button-next');
// buttonNext.addEventListener('click', cambiarImg);
