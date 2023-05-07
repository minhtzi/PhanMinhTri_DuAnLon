let phong = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

function changeProduct(type, element) {
  let tabs = document.getElementsByClassName('snip1575')
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.background = 'none'
  }
  element.style.background = '#b14c38'
}

const btns = document.querySelectorAll('.snip1575')
const storeProducts = document.querySelectorAll('.card-body')

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', (e) => {
    const filter = e.target.dataset.filter
    storeProducts.forEach((product) => {
      if (filter == 'All') {
        product.style.display = 'block'
        product.classList.add('animated-out')
        product.classList.add('animated-in')
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block'
          product.classList.add('animated-in')
        } else {
          product.style.display = 'none'
          product.classList.add('animated-out')
        }
      }
    })
  })
}

function hien(e) {
  $('.hide').show('slow')
  $('.showsp').css('display', 'none')
}

let search = phong('.search')
let modal = phong('#view')
let btnAdd = modal.querySelector('.add')
let modalBody = modal.querySelector('.modal-body')
const logic = (item) => {
  let product = item.parentElement.parentElement
  let image = product.querySelector('img').src
  const priceElement = product
    .querySelector('.product-price')
    .innerText.replace('$', '')
    .replace(',', '')
  let price = parseFloat(priceElement) / 100
  let desc =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, dolores.'
  let product_img = document.createElement('div')
  product_img.classList.add('product-img')
  let img = document.createElement('img')
  img.src = image
  product_img.appendChild(img)
  modalBody.appendChild(product_img)
  let product_info = document.createElement('div')
  product_info.classList.add('product-info')
  let product_text = document.createElement('div')
  product_text.classList.add('product-text')
  let product_name = document.createElement('h1')
  product_name.classList.add('text-uppercase')
  product_name.classList.add('text-light')
  product_name.innerText = item.innerText
  product_text.appendChild(product_name)
  let product_desc = document.createElement('p')
  product_desc.innerText = desc
  product_text.appendChild(product_desc)
  let product_quantity = document.createElement('div')
  product_quantity.classList.add('quantity')
  product_quantity.innerHTML += 'Số lượng'
  let btnDecrease = document.createElement('button')
  btnDecrease.innerHTML = '-'
  let quantity_span = document.createElement('span')
  quantity_span.innerText = '1'
  let btnIncrease = document.createElement('button')
  btnIncrease.innerHTML = '+'
  product_quantity.appendChild(btnDecrease)
  product_quantity.appendChild(quantity_span)
  product_quantity.appendChild(btnIncrease)
  product_text.appendChild(product_quantity)
  let product_price = document.createElement('div')
  product_price.classList.add('product-price-btn')
  let product_price_p = document.createElement('p')
  let product_price_span = document.createElement('span')
  product_price_span.innerText = price
  product_price_p.innerHTML = '$'
  product_price_p.appendChild(product_price_span)
  product_price.appendChild(product_price_p)
  product_price.appendChild(btnAdd)
  product_text.appendChild(product_price)
  product_info.appendChild(product_text)
  modalBody.appendChild(product_info)
  let count = 1
  btnDecrease.addEventListener('click', (e) => {
    e.preventDefault()
    count <= 0 ? alert('không thể xóa nữa') : count--
    quantity_span.innerText = count
    product_price_span.innerText = (price * count).toFixed(2)
  })
  btnIncrease.addEventListener('click', (e) => {
    e.preventDefault()
    count++
    quantity_span.innerText = count
    product_price_span.innerText = (price * count).toFixed(2)
  })
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault()
    const product = {
      name: item.innerText,
      image,
      price,
      quantity: count
    }
    localStorage.setItem('product', JSON.stringify(product))

    return
  })
}
//search

search.addEventListener('click', (e) => {
  e.preventDefault()
  let form = search.parentElement
  let input = form.querySelector('input')
  let productName = $$('.product-name')
  let productNameArray = []
  for (let i = 0; i < productName.length; i++) {
    productNameArray.push(productName[i].innerText)
  }

  let result = productNameArray.filter((item) =>
    item.includes(input.value.toUpperCase())
  )

  modal.addEventListener('hide.bs.modal', () => {
    console.log(true)
    modalBody.innerHTML = ''
  })
  for (let i = 0; i < productName.length; i++) {
    if (productName[i].innerText === result[0]) {
      logic(productName[i])
      break
    }
  }
  input.value = ''
})

let view = $$('.view')
view.forEach((item) => {
  let productCard = item.parentElement
  let productName = productCard.querySelector('.product-name')
  item.addEventListener('click', () => {
    logic(productName)
    return
  })
})
modal.addEventListener('hide.bs.modal', () => {
  modalBody.innerHTML = ''
})

const toTop = phong('.to-header')
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink')
  } else {
    header.classList.remove('shrink')
  }
})

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add('active')
  } else {
    toTop.classList.remove('active')
  }
})

//login
let store = JSON.parse(localStorage.getItem('user'))
let log = phong('.login')
const login = () => {
  alert('Bạn cần đăng nhập để mua hàng')
  window.location.href = 'login.html'
}
const logout = () => {
  localStorage.removeItem('user')
  window.location.href = 'index.html'
}
const logoutUI = () => {
  let user = document.createElement('div')
  user.classList.add('user')
  let btnLogout = document.createElement('button')
  btnLogout.classList.add('btn', 'btn-danger')
  btnLogout.innerText = 'Logout'
  user.appendChild(btnLogout)
  log.appendChild(user)
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.href = '../index.html'
  })
}

store == null ? '' : logoutUI()

log.addEventListener('click', () => {
  store != null ? logoutUI() : login()
})

let cart = phong('.cart')
store == null
  ? cart.classList.add('disabled')
  : cart.addEventListener('click', () => {
      window.location.href = '../html/cart.html'
    })
let addContainter = $$('.add')

for (let i = 0; i < addContainter.length; i++) {
  let add = addContainter[i]
  add.addEventListener('click', function (e) {
    e.preventDefault()
    let product = add.parentElement
    let name = product.querySelector('.product-name').innerText
    let price = product
      .querySelector('.product-price')
      .innerText.replace('$', '')
    price = price.slice(0, price.length - 3)
    let image = product.querySelector('img').src
    let addProduct = {
      name,
      price,
      image
    }
    console.log(addProduct)
    localStorage.setItem('product', JSON.stringify(addProduct))
  })
}
