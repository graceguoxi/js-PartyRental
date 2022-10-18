
// 1. get the product categories and render the category select list

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
let selectedCategory = document.getElementById('category-select')
let selectedPrice = document.querySelector('#price-select')

renderCategoryList()
executeFilter()

function renderCategoryList() {
	const prodCategoryList = rawdata[0].prodType.productCategory
	let category = `<option value="0">All hires</option>`

	for(let i of prodCategoryList) {
  	category += `
	  	<option value="${i.categoryId}">${i.categoryName}</option>
		`
	}

	selectedCategory.innerHTML = category
}


// 2. update/delete the url search params based on the users select/click,
// then navigate to the updated url

function filterAll(clicked_id) {
  if(clicked_id == 'category-select'){
		params.set('categoryId',selectedCategory.value)
	}else if(clicked_id == 'price-select') {
		params.set('priceRange',selectedPrice.value)
	}else if(clicked_id == 'ascend') {
		params.set('sort','asc')
	}else if(clicked_id == 'decend') {
		params.set('sort','desc')
	} else if(clicked_id == 'reset') {
		params.delete('categoryId')
		params.delete('priceRange')
		params.delete('sort') 
	}
	window.location.href = `${window.location.pathname}?${params.toString()}`
}


// 3. based on the filters and sort, filter out the products and render products
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
	// console.log('all' ,categoryValue)

  let seleProd = rawdata.filter((item) => {
		// let commonFilter = item.productMedia && item.productMedia.length >0
    let commonFilter = (item.productMedia && item.productMedia.length > 0) ?
		item:null
		
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
	// console.log(seleProd)
  
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






	
