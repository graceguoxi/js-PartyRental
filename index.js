

const prodCategoryList = rawdata[0].prodType.productCategory

let allcategorys = document.querySelector('#select')

let category = `<option value="0">ALL Hires</option>`

for (let i of prodCategoryList) {
	category += `
		<option value="${i.categoryId}">${i.categoryName}</option>
	`
}

allcategorys.innerHTML = category


const productList1 = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// function filterCategory () {
// 	// console.log("aa")
// 	let select = document.getElementById('select')
// 	let value = select.value
// 	// console.log(value)

// 	const selectedProd = rawdata.filter(function(item) {

// 	  return item.categoryId == value && item.productMedia && item.productMedia.length >0
		 	
// 	})
// 	// console.log('1111',selectedProd)
// 	list(selectedProd)
	
// }

function filterAll() {
  // console.log('bbb')

	let selectedPrice = document.querySelector
	('#price-select')
	let priceValue = selectedPrice.value
	// console.log('8888',priceValue)
	let select = document.getElementById('select')
	let value = select.value
  console.log('all' ,value)

	let ascend = document.querySelector('#ascend');
	let decend = document.querySelector('#decend');
	let reset = document.querySelector('#reset');	

  const seleProd = rawdata.filter(function(item) {
		let commonFilter = item.productMedia && item.productMedia.length >0
		if(value !== '0') {
      commonFilter = item.categoryId == value && commonFilter
		}
		if (priceValue === '100') {
			// console.log ('100',100)
      return item.price <= 100 && commonFilter
		}
		if (priceValue == '500' ) {
			// console.log(500)
			return item.price > 100 && item.price <= 500 && commonFilter
		}
		if(priceValue === '1000') {
			return item.price > 500 && item.price <= 1000 && commonFilter
		}
		if(priceValue === '>1000') {
			return item.price >1000 && commonFilter
		}
		return commonFilter
	})
	console.log(seleProd)
  
	if(ascend.)
	seleProd.sort((a,b) => a.price - b.price)

	list(seleProd)
}


function list (productList) {

	let listElement = document.querySelector('#prodList')
	let templates = ''

	productList.forEach(product => {
	// for (let product of productList) {
		

		let viewTemplate = `
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
		templates += viewTemplate
	}
	)


	listElement.innerHTML = templates
}

list(productList1);

// let ascend = document.querySelector('#ascend');
// let decend = document.querySelector('#decend');
// let reset = document.querySelector('#reset');

console.log('as',ascend);

// function ascending () {
// 	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// 	products.sort((a,b) => a.price - b.price)
// 	list(products);
// }

function decending () {
	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

	products.sort((a,b) => b.price - a.price)
	list(products);
}

function resetItem () {
	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

	list(products);
}


	
