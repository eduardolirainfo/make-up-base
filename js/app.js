(async () => {
  let response = await fetch("data/products.json");
  console.log(await response.json());
})();


function productItem(product) {
  const item = `<div class="product" data-name="${product.name}" data-brand="${product.brand}" data-type="${product.product_type}" tabindex="${product.id}">
  <figure class="product-figure">
    <img src="${product.image_link}" width="215" height="215" alt="${product.name}" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
<span class="product-brand background-price">${(parseFloat(product.price) * 5.5).toFixed(2)}</span></div>
  </section>
  <section class="product-details">
  ${loadDetails(product)}
  </section>
</div>`;
}

function loadDetails(product) {

  let details = ["brand","price","product_type","category","rating"]
  return Object.entries(product).filter(([name, value]) => details.includes(name)).map(([name, value])=>
  {
    `<div class="details-row">
        <div>${name}</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${(parseFloat(value) * 5.5).toFixed(2)}</div>
        </div>
      </div>`
  }).join("") 
}

function sortProducts(products, sortType){
  switch (sortType) {
    case "Melhores Avaliados":
      return products.sort((a, b) =>
        a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0
      );
    case "Menores Preços":
      return products.sort((a, b) =>
        parseFloat(a.price) > parseFloat(b.price)
          ? 1
          : parseFloat(a.price) < parseFloat(b.price)
          ? -1
          : 0
      );
    case "Maiores Preços":
      return products.sort((a, b) =>
        parseFloat(a.price) > parseFloat(b.price)
          ? -1
          : parseFloat(a.price) < parseFloat(b.price)
          ? 1
          : 0
      );
    case "A-Z":
      return products.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      );
    case "Z-A":
      return products.sort((a, b) =>
        a.name > b.name ? -1 : a.name < b.name ? 1 : 0
      );
  }
}