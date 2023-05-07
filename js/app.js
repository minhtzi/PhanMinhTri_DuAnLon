let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

let banner_slide = $('#banner-slide')

let banner_slide_items = banner_slide.querySelectorAll('.slide')

let banner_slide_index = 0

let banner_slide_play = true

let banner_slide_control_items = banner_slide.querySelectorAll(
  '.slide-control-item'
)

let slide_next = banner_slide.querySelector('.slide-next')

let slide_prev = banner_slide.querySelector('.slide-prev')

const toTop = $('.to-header')

let header = $('header')

showSlide = (index) => {
  banner_slide.querySelector('.slide.active').classList.remove('active')
  banner_slide
    .querySelector('.slide-control-item.active')
    .classList.remove('active')
  banner_slide_control_items[index].classList.add('active')
  banner_slide_items[index].classList.add('active')
}

nextSlide = () => {
  banner_slide_index =
    banner_slide_index + 1 === banner_slide_items.length
      ? 0
      : banner_slide_index + 1
  showSlide(banner_slide_index)
}

prevSlide = () => {
  banner_slide_index =
    banner_slide_index - 1 < 0
      ? banner_slide_items.length - 1
      : banner_slide_index - 1
  showSlide(banner_slide_index)
}

slide_next.addEventListener('click', () => nextSlide())

slide_prev.addEventListener('click', () => prevSlide())

// add event to slide select
banner_slide_control_items.forEach((item, index) => {
  item.addEventListener('click', () => showSlide(index))
})

// pause slide when mouse come in slider
banner_slide.addEventListener('mouseover', () => (banner_slide_play = false))

// resume slide when mouse leave out slider
banner_slide.addEventListener('mouseleave', () => (banner_slide_play = true))

// auto slide
setInterval(() => {
  if (!banner_slide_play) return
  nextSlide()
}, 5000)

// change header style when scroll
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
//store

let addContainter = $$('.add')

for (let i = 0; i < addContainter.length; i++) {
  let add = addContainter[i]
  add.addEventListener('click', function (e) {
    e.preventDefault()
    let product = add.parentElement
    console.log(product)
    let name = product.querySelector('.product-name').innerText
    let price = product.querySelector('.product-price').innerText
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
let discount = $('.discount')
let countDownDate = new Date('April 1, 2023 00:00:00').getTime()
let x = setInterval(function () {
  let now = new Date().getTime()
  let distance = countDownDate - now
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((distance % (1000 * 60)) / 1000)
  $('.discount').value = `Discount in ${hours}:${minutes}:${seconds}`
  if (distance < 0) {
    clearInterval(x)
    $('.discount').value = 'EXPIRED'
  }
}, 1000)

let store = JSON.parse(localStorage.getItem('user'))
let log = $('.login')
const login = () => {
  alert('Bạn cần đăng nhập để mua hàng')
  window.location.href = 'html/login.html'
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
    window.location.href = 'index.html'
  })
}

store == null ? '' : logoutUI()

log.addEventListener('click', () => {
  store != null ? logoutUI() : login()
})

let cart = $('.cart')
store == null
  ? cart.classList.add('disabled')
  : cart.addEventListener('click', () => {
      window.location.href = '../html/cart.html'
    })

//view product
let search = $('.search')
let modal = $('#view')
let btnAdd = modal.querySelector('.add')
let modalBody = modal.querySelector('.modal-body')
const logic = (item) => {
  let product = item.parentElement.parentElement
  let image = product.querySelector('img').src
  const price = product
    .querySelector('.product-price')
    .innerText.replace('.000.000 đồng')
    .replace(',', '')
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
  product_price_p.innerHTML = '.000.000 đồng'
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
    product_price_span.innerText = price * count
  })
  btnIncrease.addEventListener('click', (e) => {
    e.preventDefault()
    count++
    quantity_span.innerText = count
    product_price_span.innerText = price * count
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
