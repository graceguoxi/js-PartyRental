// const productList = rawdata.filter(item => item.productMedia && item.productMedia.length > 0)

// console.log('products', productList);

// let listElement = document.querySelector('#prodList');
// let templates = ''

// // for(let product of productList)

// productList.forEach(product => {
// 	const viewTemplate = `
// 		<div class="col-3">
// 			<a href="./detail.html?prodId=${product.prodId}">
// 				<div class="card">
// 					<img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}" class="card-img-top" alt="...">
// 					<div class="card-body">
// 						<h5 class="card-title">${product.title}</h5>
// 						<p class="card-text">$ ${product.price}</p>
// 					</div>
// 				</div>
// 			</a>
// 		</div>
// 	`
// 	templates += viewTemplate

//   // let col = document.createElement("div");
//   // col.setAttribute('class', 'col-3')
//   // let card = document.createElement("div");
//   // card.setAttribute('class', 'card');
//   // let img = document.createElement("img");
//   // img.setAttribute('src', "https://storage.googleapis.com/luxe_media/wwwroot/Images/ProductImages/21b2890a-21dc-4d62-b628-3df10a6507c0");
//   // card.appendChild(img);
//   // col.appendChild(card);
//   // list.appendChild(col);
// })

// listElement.innerHTML = templates

// console.log('prod', prodList)


const prodCategoryList = rawdata[0].prodType.productCategory

let allcategorys = document.querySelector('#select')

let category = `<option value="0">ALL Hires</option>`

for (let i of prodCategoryList) {
	category += `
		<option value="${i.categoryId}">${i.categoryName}</option>
	`
}

allcategorys.innerHTML = category

const productList2 = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// console.log('new',productList2)

let listElement2 = document.querySelector('#prodList')
let templates2 = ''

productList2.forEach(product => {
// for (let product of productList2) {
  

	let viewTemplate2 = `
		<div class="col-3">
			<a href="./detail/detail.html?prodId=${product.prodId}">
				<div class="card">
					<img src="https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">${product.title}</h5>
						<p class="card-text">$ ${product.price}</p>
					</div>
				</div>
			</a>
		</div>
	`
	templates2 += viewTemplate2
}
)


listElement2.innerHTML = templates2