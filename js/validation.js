let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)

function Validator(options) {
  var formElement = $(options.form)

  const getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }

  const selectorRules = {}
  const validate = (inputElement, rule) => {
    const errorElement = getParent(
      inputElement,
      options.formGroupSeletor
    ).querySelector(options.errorSelector)
    let errorMessage

    const rules = selectorRules[rule.selector]
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value)
      if (errorMessage) break
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage
      getParent(inputElement, options.formGroupSeletor).classList.add(
        'text-danger',
        'mt-2'
      )
    } else {
      errorElement.innerText = ''
      getParent(inputElement, options.formGroupSeletor).classList.remove(
        'text-danger',
        'mt-2'
      )
    }
    return !errorMessage
  }
  if (formElement) {
    //onsubmit
    formElement.onsubmit = (e) => {
      e.preventDefault()
      let isFormValid = true
      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector)

        let isValid = validate(inputElement, rule)
        if (!isValid) {
          isFormValid = false
        }
      })
      if (isFormValid) {
        if (typeof options.onSubmit === 'function') {
          let enableInputs = formElement.querySelectorAll('[name]')
          let formValues = Array.from(enableInputs).reduce((values, input) => {
            values[input.name] = input.value
            return values
          }, {})
          options.onSubmit(formValues)
        }
      }
    }

    options.rules.forEach((rule) => {
      //luu rules
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test)
      } else {
        selectorRules[rule.selector] = [rule.test]
      }

      const inputElement = formElement.querySelector(rule.selector)

      if (inputElement) {
        //xử lí khi người dùng không nhập
        inputElement.onblur = () => {
          validate(inputElement, rule)
        }

        //xử lí người dùng đang nhập mất error
        inputElement.oninput = () => {
          const errorElement = getParent(
            inputElement,
            options.formGroupSeletor
          ).querySelector(options.errorSelector)
          errorElement.innerText = ''
          getParent(inputElement, options.formGroupSeletor).classList.remove(
            'text-danger',
            'mt-2'
          )
        }
      }
    })
  }
}

Validator.isRequired = (selector, message) => {
  return {
    selector,
    test: (value) =>
      value ? undefined : message || 'Vui lòng nhập trường này',
  }
}
Validator.isEmail = (selector, message) => {
  return {
    selector,
    test: (value) => {
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(value)
        ? undefined
        : message || 'Trường này không phải là email'
    },
  }
}
Validator.isPassword = (selector, min) => {
  return {
    selector,
    test: (value) =>
      value.trim() && value.length >= min
        ? undefined
        : `Vui lòng nhập trường này ít nhất có ${min} kí tự`,
  }
}
Validator.isConfirmPassword = (selector, getConfirmPassword, message) => {
  return {
    selector,
    test: (value) =>
      value === getConfirmPassword()
        ? undefined
        : message || 'Vui lòng nhập trường này',
  }
}
