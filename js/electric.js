let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

const toTop = $('.to-header')
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
let log = $('.login')
const login = () => {
  alert('Bạn cần dăng nhập để mua hàng')
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

let cart = $('.cart')
store == null
  ? cart.classList.add('disabled')
  : cart.addEventListener('click', () => {
      window.location.href = '../html/cart.html'
    })

//see more
let seeMore = $('#see-more')
let products = $('.products')
let storeProducts = [
  {
    name: 'Nike  Max',
    image: '../images/electric/xetrong1.jpg',
    price: 100
  },
  {
    name: 'Nike Air ',
    image: '../images/electric/xetrong1.jpg',
    price: 200
  },
  {
    name: ' Air Max',
    image: '../images/electric/xetrong1.jpg',
    price: 300
  },
  {
    name: '  Max',
    image: '../images/electric/xetrong1.jpg',
    price: 400
  },
  {
    name: 'Nike  Max',
    image: '../images/electric/xetrong2.jpg',
    price: 500
  },
  {
    name: ' Air ',
    image: '../images/electric/xetrong2.jpg',
    price: 600
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong2.jpg',
    price: 700
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong2.jpg',
    price: 800
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong3.jpg',
    price: 900
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong3.jpg',
    price: 1000
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong3.jpg',
    price: 1200
  },
  {
    name: 'Nike Air Max',
    image: '../images/electric/xetrong3.jpg',
    price: 1300
  }
]

const productUI = storeProducts
  .map((product) => {
    return `
    <div class="col-lg-3">
      <div class="product-card  m-3">
        <a href="notfound.html">
          <div class="product-card-img">
            <img src=${product.image} alt="No" />
          </div>
          <div class="overlay">
            <p class="product-name">${product.name}</p>
            <b>
              <p class="price">
                <span class="product-price"> $${product.price} </span>
              </p>
            </b>
          </div>
          <div class="sales">
            <span>Giảm<br>giá</span>
          </div>
        </a>
        <button class="btn mt-2 add">Thêm vào giỏ hàng</button>
        <button
          class="view mt-2 btn"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#view"
        >
          <i class="bx bx-low-vision"></i>
        </button>
      </div>
    </div>
    `
  })
  .join('')

seeMore.addEventListener('click', (e) => {
  e.preventDefault()
  products.innerHTML += productUI

  seeMore.classList.add('disabled')
  let productCard = products.querySelectorAll('.product-card')
  for (let i = 8; i < productCard.length; i++) {
    let price = productCard[i].querySelector('.price')
    let productPriceElement = productCard[i].querySelector('.product-price')
    let productPrice = productPriceElement.innerText.replace('$', '')
    if (parseFloat(productPrice) > 500) {
      productPriceElement.innerText = '$' + (parseFloat(productPrice) - 100)
      let span = document.createElement('span')
      let strike = document.createElement('strike')
      strike.classList.add('Xóa')
      strike.innerText = '$' + productPrice
      span.appendChild(strike)
      price.appendChild(span)
    } else {
      let sales = productCard[i].querySelector('.sales')
      sales.classList.add('disabled')
    }
  }
  let search = $('.search')
  let modal = $('#view')
  let btnAdd = modal.querySelector('.add')
  let modalBody = modal.querySelector('.modal-body')
  const logic = (item) => {
    let product = item.parentElement.parentElement
    let image = product.querySelector('img').src
    const price = product
      .querySelector('.product-price')
      .innerText.replace('$', '')
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
      // alert('Thêm vào giỏ hàng thành công')

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
})

//sort
let sort = $('.sort-list')
sort.addEventListener('click', (e) => {
  let li = e.target
  if (li.tagName === 'LI') {
    li.classList.add('sort-active')
    let productCard = products.querySelectorAll('.product-card')

    productCard.forEach((product) => {
      let col = product.parentElement
      if (li.innerText == 'All') {
        col.classList.add('animated-out')
        col.classList.add('animated-in')
        col.classList.remove('active')
        col.classList.remove('disabled')
      } else {
        if (li.innerText == 'installment 0%') {
          col.classList.remove('disabled')
          col.classList.add('animated-out')
          if (product.classList.contains('installment')) {
            col.classList.add('animated-in')
            col.classList.add('active')
          } else {
            col.classList.add('animated-out')
            col.classList.add('disabled')
            col.classList.remove('active')
          }
        } else if (li.innerText == 'cheap') {
          col.classList.remove('disabled')
          col.classList.add('animated-out')
          col.classList.add('animated-in')
          let cols = products.querySelectorAll('.col-lg-3')
          for (let i = 0; i < cols.length; i++) {
            let productPriceElement = cols[i].querySelector('.product-price')
            let productPrice = productPriceElement.innerText.replace('$', '')
            console.log(productPrice)
            for (let j = 0; j < cols.length; j++) {
              let productPriceElement2 = cols[j].querySelector('.product-price')
              let productPrice2 = productPriceElement2.innerText.replace(
                '$',
                ''
              )
              if (parseFloat(productPrice) > parseFloat(productPrice2)) {
                cols[i].parentElement.insertBefore(cols[j], cols[i])
                break
              }
            }
            break
          }
        } else if (li.innerText == 'expensive') {
          col.classList.remove('disabled')
          col.classList.add('animated-out')
          col.classList.add('animated-in')
          let cols = products.querySelectorAll('.col-lg-3')
          for (let i = 0; i < cols.length; i++) {
            let productPriceElement = cols[i].querySelector('.product-price')
            let productPrice = productPriceElement.innerText.replace('$', '')
            console.log(productPrice)
            for (let j = 0; j < cols.length; j++) {
              let productPriceElement2 = cols[j].querySelector('.product-price')
              let productPrice2 = productPriceElement2.innerText.replace(
                '$',
                ''
              )
              if (parseFloat(productPrice) < parseFloat(productPrice2)) {
                cols[i].parentElement.insertBefore(cols[j], cols[i])
                break
              }
            }
            break
          }
        } else {
          col.classList.remove('active')
          col.classList.add('disabled')
          col.classList.add('animated-out')
        }
      }
    })

    let siblings = li.parentNode.children
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] !== li) {
        siblings[i].classList.remove('sort-active')
      }
    }
  }
})
