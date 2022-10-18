
// 1. get the product categories and render the category select list
//初始化URL URL() 构造函数返回一个新创建的 URL 对象
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
//得到category 和 price 选择框
let selectedCategory = document.getElementById('category-select')
let selectedPrice = document.querySelector('#price-select')

renderCategoryList()
executeFilter()

function renderCategoryList() {
	//得到所有的category
	const prodCategoryList = rawdata[0].prodType.productCategory
	//设置默认的option
	let category = `<option value="0">All hires</option>`

	//for循环prodCategoryList里的每一个i 然后放到category里
	for(let i of prodCategoryList) {
  	category += `
	  	<option value="${i.categoryId}">${i.categoryName}</option>
		`
	}

	//render到页面
	selectedCategory.innerHTML = category
}


// 2. update/delete the url search params based on the users select/click,
// then navigate to the updated url

function filterAll(clicked_id) {
	//判断clicked_id 是否是 category-select，如果是 就把categoryId设置为 selectedCategory.value
  if(clicked_id == 'category-select'){
		params.set('categoryId',selectedCategory.value)
		//判断clicked_id 是否是 price-select，如果是 就把priceRange设置为 selectedPrice.value
	}else if(clicked_id == 'price-select') {
		params.set('priceRange',selectedPrice.value)
	}else if(clicked_id == 'ascend') {
		//判断clicked_id 是否是 ascend，如果是 就把sort设置为 asc
		params.set('sort','asc')
	}else if(clicked_id == 'decend') {
		//判断clicked_id 是否是 decend，如果是 就把sort设置为 desc
		params.set('sort','desc')
	} else if(clicked_id == 'reset') {
		//判断clicked_id 是否是 reset，如果是 就把之前的设置都delete掉
		params.delete('categoryId')
		params.delete('priceRange')
		params.delete('sort') 
	}
	//用得到的URL重定向新的
	window.location.href = `${window.location.pathname}?${params.toString()}`
}


// 3. based on the filters and sort, filter out the products and render products
function executeFilter() {
	//得到categoryId 赋值给categoryValue
	const categoryValue = params.get('categoryId') || "0"
	//判断是否有得到categoryId 如果有就赋值给selectedCategory.value 改变select框的值
	if (params.get('categoryId')) {
		selectedCategory.value = params.get('categoryId')
	}
	// console.log('category', selectedCategory.value)

	const priceValue = params.get('priceRange') || "0"
	if(params.get('priceRange')) {
		selectedPrice.value = params.get('priceRange')
	}

	//得到sort 赋值给sort
	const sort = params.get('sort')
	// console.log('all' ,categoryValue)

  let seleProd = rawdata.filter((item) => {
		// let commonFilter = item.productMedia && item.productMedia.length >0

		//筛选出有图片的产品 把它赋值给commonFilter
    let commonFilter = (item.productMedia && item.productMedia.length > 0) ?
		item:null
		
		//判断categoryValue的value，如果不等于0，如果筛选出来的有图片的产品 并且这个产品的categoryValue和categoryId一样 赋值给commonFilter
		if(categoryValue !== '0') {
      commonFilter = item.categoryId == categoryValue && commonFilter
			// console.log(commonFilter)
		}
		// console.log('cate',categoryValue)

		//判断如果priceValue === 100 就过滤出来那些价格<= 100 并且符合commonFilter条件的产品
		if (priceValue === '100') {
			// console.log ('100',100)
      return item.price <= 100 && commonFilter
		}
		if (priceValue === '500' ) {
			// console.log(500)
			return item.price > 100 && item.price <= 500 && commonFilter
		}
		if(priceValue === '1000') {
			return item.price > 500 && item.price <= 1000 && commonFilter
		}
		if(priceValue === '>1000') {
			return item.price >1000 && commonFilter
		}
    //如果上面的条件都不符合 就直接returncommonFilter
		return commonFilter
	})
	// console.log(seleProd)
  
	//判断如果sort === asc 那就用sort方法把所有的产品按价格从低到高来排序
	if( sort === 'asc' ) {
		seleProd.sort((a,b) => a.price - b.price)
		//判断如果sort === desc 那就用sort方法把所有的产品按价格从高到低来排序
	}else if ( sort === 'desc' ) {
		seleProd.sort((a,b) => b.price - a.price)
	}

	list(seleProd)
}

function list(productList) {
  //得到prodList
	let listElement = document.querySelector('#prodList')
	//给一个空变量 用来装遍历出来的所有产品
	let templates = ''

	productList.forEach(product => {
	// for (let product of productList) {
		
   //遍历模版 遍历所有产品
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
		//把遍历出来的模版都添加到空变量里
		templates += viewTemplate
	}
	)
	//把遍历出来的所有产品渲染到页面
	listElement.innerHTML = templates
}






	
