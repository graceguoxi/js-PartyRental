
const prodCategoryList = rawdata[0].prodType.productCategory

let allcategorys = document.querySelector('#select')

let category = `<option value="0">ALL Hires</option>`

for (let i of prodCategoryList) {
	category += `
		<option value="${i.categoryId}">${i.categoryName}</option>
	`
}

allcategorys.innerHTML = category

const url = new URL(window.location.href)
console.log('search', url.search)
const params = new URLSearchParams(url.search)
console.log('params', params.toString())
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
let selectedPrice = document.querySelector('#price-select')
let selectedCategory = document.getElementById('select')

function filterAll(clicked_id) {
	if( clicked_id == 'ascend' ) {
		params.set('sort','asc')
	}else if ( clicked_id == 'decend' ) {
		params.set('sort','desc')
	}else if ( clicked_id == 'reset'){
		params.delete('categoryId')
		params.delete('priceRange')
		params.delete('sort')
	}else if( clicked_id == 'select') {
    params.set('categoryId',selectedCategory.value)
	}else if(clicked_id == 'price-select') {
		params.set('priceRange',selectedPrice.value)
	}


	window.location.href = `${window.location.pathname}?${params.toString()}`
}

function executeFilter() {
	
	const categoryValue = params.get('categoryId') || "0"
	if (params.get('categoryId')) {
		selectedCategory.value = params.get('categoryId')
	}
	// console.log('category', category)

	const priceValue = params.get('priceRange') || "0"
	if(params.get('priceRange')) {
		selectedPrice.value = params.get('priceRange')
	}

	const sort = params.get('sort')
	

  // console.log('bbb')
	// console.log(clicked_id)

	// let selectedPrice = document.querySelector('#price-select')
	// let priceValue = selectedPrice.value
	// console.log('8888',priceValue)
	// let selectedCategory = document.getElementById('select')
	// let categoryValue = selectedCategory.value
  console.log('all' ,categoryValue)

  let seleProd = rawdata.filter((item) => {
		// let commonFilter = item.productMedia && item.productMedia.length >0

		let commonFilter = (item.productMedia && item.productMedia.length > 0) ?
		item:null
		// if(item.productMedia && item.productMedia.length > 0) commonFilter = item

		// console.log(commonFilter)


		if(categoryValue !== '0') {
      commonFilter = item.categoryId == categoryValue && commonFilter
			// console.log(commonFilter)
		}
		// console.log('cate',categoryValue)
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
  
	if( sort == 'asc' ) {
		seleProd.sort((a,b) => a.price - b.price)
		
	}else if ( sort == 'desc' ) {
		seleProd.sort((a,b) => b.price - a.price)
	}

	list(seleProd)
}

function list(productList) {

	let listElement = document.querySelector('#prodList')
	let templates = ''

	productList.forEach(product => {
	// for (let product of productList) {
		

		const viewTemplate = `
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

executeFilter();

// list(productList1);

// let ascend = document.querySelector('#ascend');
// let decend = document.querySelector('#decend');
// let reset = document.querySelector('#reset');

// console.log('as',ascend);

// function ascending () {
// 	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// 	products.sort((a,b) => a.price - b.price)
// 	list(products);
// }

// function decending () {
// 	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// 	products.sort((a,b) => b.price - a.price)
// 	list(products);
// }

// function resetItem () {
// 	let products = rawdata.filter(item =>item.productMedia && item.productMedia.length >0)

// 	list(products);
// }


	
