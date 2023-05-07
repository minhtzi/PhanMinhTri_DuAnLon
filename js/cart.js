let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink')
  } else {
    header.classList.remove('shrink')
  }
})
const toTop = $('.to-header')

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    console.log('scroll')
    toTop.classList.add('active')
  } else {
    toTop.classList.remove('active')
  }
})
const empty = () => {
  let emptyContainer = document.querySelectorAll('body')[0]
  let emptyRow = emptyContainer.querySelectorAll('.empty')
  emptyRow[0].classList.add('active')
}
//render
let oldProduct = JSON.parse(localStorage.getItem('product'))
oldProduct == null && empty()
let newItem = []
newItem.push(oldProduct)

let renderItem = newItem.map((item) => {
  item.quantity == null ? (item.quantity = 1) : (item.quantity = item.quantity)
  return `
  <div class="row">
    <div class="col-lg-12 p-5 mb-3">
      <div class="table-responsive">
        <table class="table text-white">
          <thead>
            <tr>
              <th>
                <span class="p-2 px-3 text-uppercase">Tên sản phẩm</span>
              </th>
              <th>
                <span class="py-2 text-uppercase">Giá thành</span>
              </th>
              <th class="text-center">
                <span class="py-2 text-uppercase ">Số lượng</span>
              </th>
              <th>
                <span class="py-2 text-uppercase">Xóa</span>
              </th>
            </tr>
          </thead>
          <tbody class="cartItems">
            <tr>
              <th>
                <div class="p-2 align-middle">
                  <img
                    src=${item.image}
                    alt=""
                    width="70"
                    class="img-fluid rounded shop-item-image"
                  />
                  <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0">
                      <a href="#" class="d-inline-block align-middle"
                        >${item.name}</a
                      >
                    </h5>
                  </div>
                </div>
              </th>
              <td class="align-middle cart-price">${item.price}</td>
              <td class="align-middle cart-quantity text-center">${item.quantity}</td>
              <td class="align-middle">
                <button class="remove">
                  <i class="ps-4 fs-4 bx bxs-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="row justify-content-end">
    <div class="col-lg-6">
      <div class="rounded-pill px-4 py-3 text-uppercase font-weight-bold">
        Thông tin đơn hàng
      </div>
      <div class="list-unstyled mb-4">
        <ul class="list-unstyled mb-4">
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Tổng tiền </strong
            ><strong class="cart-total-price">$10</strong>
          </li>
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Phí vận chuyển</strong
            ><strong class="ship">$10</strong>
          </li>
          <li class="d-flex justify-content-between py-3 border-bottom">
            <strong class="text-muted">Tổng tiền</strong>
            <h5 class="font-weight-bold total-price">$400</h5>
          </li>
        </ul>
        <a
          href="#"
          class="btn btn-dark rounded-pill py-2 btn-block float-end btn-purchase"
          >Thanh toán</a
        >
      </div>
    </div>
  </div>
  `
})

$('.container').innerHTML += renderItem
//check cart item
const removeCartItem = (e) => {
  let buttonClicked = e.target
  buttonClicked.parentElement.parentElement.parentElement.remove()

  updateCartTotal()
}
let removeItem = $$('.remove')
for (let i = 0; i < removeItem.length; i++) {
  let button = removeItem[i]
  button.addEventListener('click', removeCartItem)
}

//update pay money
const updateCartTotal = () => {
  let cartItemContainer = $$('.cartItems')[0]
  let cartRows = cartItemContainer.querySelectorAll('tr')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.querySelectorAll('.cart-price')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))

    let quantityElements = cartRow.querySelectorAll('.cart-quantity')[0]

    let quantity = parseFloat(quantityElements.innerText)
    total = price * quantity
  }
  total = Math.round(total)
  $$('.cart-total-price')[0].innerText = '$' + total
  let ship = parseFloat($$('.ship')[0].innerText.replace('$', ''))
  $$('.total-price')[0].innerText = '$' + (total + ship)
}
newItem.length < 1 ? empty() : updateCartTotal()
//clear cart
const purchaseClicked = () => {
  alert('Cảm ơn bạn đã ủng hộ TuaBike')
  localStorage.removeItem('Thêm sản phẩm')
  let cartItems = $$('.container')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
    empty()
  }
}
$$('.btn-purchase')[0].addEventListener('click', purchaseClicked)
