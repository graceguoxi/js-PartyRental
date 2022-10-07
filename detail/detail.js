const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
console.log ('window',window.location.search)
const prodId = params.prodId;
console.log('params', params.prodId);

const product = rawdata.find(item => item.prodId == prodId);
console.log('product', product);

const viewTemplate = `
  <div class="detailPage">
    <p class="active">
      <a href="../index.html">Back to HomePage</a>
    </p>
    <div class="detail-box">
      <div class="detail-title">
        <h2 class="card-title">${product.title}</h2>
				<h4 class="card-text">$ ${product.price}</h4>
      </div>
      <div class="detail-content">
        <img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}" class="card-img-top" alt="...">
        <p>${product.description}</p>
      </div>
    </div>
  </div>
    `

document.body.innerHTML = viewTemplate



