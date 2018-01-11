/*eslint-disable */
import { feathersClient } from './apiClient'
import { imageProcessingUrl } from '../constants'
import { request } from 'http';

export const createUpload = ({commit}, reader) => {
  const uploadService = feathersClient.service('uploads')
  return uploadService
    .create({uri: reader.result})
    .then(function (response) {
      return response
    })
}

export const generateSequence = ({commit}, requestData) => {
  const uploadService = feathersClient.service('post-data')
  return uploadService
    .create(requestData)
    .then(async function (response) {
      let requestData = JSON.parse(response.request)
      
      // this is old and single api for image
      // let url = makeUrl(requestData)
      
      // this API only merge images 
      let url = mergeImages(requestData)
      
      response.url = url
      return response
    })
}

export const fontFamily = ({ commit }) => {
  const fontService = feathersClient.service('font-family')
  return fontService.find()
    .then(function (response) {
      return response.data
    })
}

export const productExist = ({ commit }, params) => {
  const product = feathersClient.service('product-exist')
  return product.find({query: params})
    .then(function (response) {
      return response
    })
}

export const supplierDetail = ({ commit }, params) => {
  const supplier = feathersClient.service('supplier-master')
  return supplier.find({query: params})
    .then(function (response) {
      return response.data
    })
}

export const imageEffect = ({ commit }, image,  params) => {
  return axios.get(imageProcessingUrl + 'image-api/' + image + params).then(function (response) {
    return response.data
  }).catch(function (error) {
    return error
  })
}

export const productDetail = ({ commit }, params) => {
  const product = feathersClient.service('products')
  return product.get(params)
    .then(function (response) {
      return response
    })
}

export const mergeImages = (response) => {


  let mainImage = response.productImage
  let images = response.cachedImages
  let layers = []
  let area_left = response.artwork_left
  let area_top = response.artwork_top
  let area_height = response.artwork_height
  let area_width = response.artwork_width
  let product_width = response.productWidth
  let product_height = response.productHeight
  let url = null
  let left = []
  let top = []

  for (var j = 0; j < response.image_area_work; j++) {
    left.push(response.left[j].value)
    top.push(response.top[j].value)
  }
  let responseLayers = response.layers

  for (var i = 0; i < responseLayers.length; i++) {
    if (responseLayers[i].type === 'image') {
      let index = responseLayers[i].key + 1
      layers.push('i-' + index)
    } else {
      let index = responseLayers[i].key + 1
      layers.push('t-' + index)
    }
  }
  let imprintMethod=''
  if (response.imprintMethod === 'fabric') {
    imprintMethod = response.imprintMethod + '=1'
  } else if (response.imprintMethod === 'leather_engrave') {
    imprintMethod = 'leather=1'
  } 

  let queryString = '?sig=KwROfoP_7DjY&' + imprintMethod + '&images=' + images.toString() + '&orders=' + layers.toString() + '&a_h=' + area_height + 
  '&a_w=' + area_width + '&a_t=' + area_top + '&a_l=' + area_left + '&p_w=' + product_width + '&p_h=' + product_height + '&c_x=' + 
  left.toString() + '&c_y=' + top.toString()

  url = imageProcessingUrl + 'merge-images/' + mainImage + queryString

  return url
}

export const makeUrl = (response) => {
  let url

  if (response.image_area_work > 0 || response.text_area_work > 0) {
    let userUploadedImage = []
    let imageHeight = []
    let imageWidth = []
    let imageLeft = []
    let imageTop = []
    let imageRotate = []
    let alignment = []
    let background = []
    let textHeight = []
    let textWidth = []
    let textLeft = []
    let textTop = []
    let fontSize = []
    let texts = []
    let textColor = []
    let textAlignment = []
    let flip = []
    let flop = []
    let textFlip = []
    let textFlop = []
    let textRotate = []
    let textCurve = []
    let fontFamily = []
    let layers = []

    let mainImage = ''

    mainImage = response.productImage

    let responseLayers = response.layers

    for (var i = 0; i < responseLayers.length; i++) {
      if (responseLayers[i].type === 'image') {
        let index = responseLayers[i].key + 1
        layers.push('i-' + index)
      } else {
        let index = responseLayers[i].key + 1
        layers.push('t-' + index)
      }
    }

    for (var j = 0; j < response.image_area_work; j++) {
      imageHeight.push(response.height[j].value)
      imageWidth.push(response.width[j].value)
      imageLeft.push(response.left[j].value)
      imageTop.push(response.top[j].value)

      imageRotate.push(response.rotate[j].value)

      userUploadedImage.push(response.userUploadedImage[j].value)

      flip.push(response.flip[j].value)
      flop.push(response.flop[j].value)
      background.push(response.background[j].value)
    }

    for (var k = 0; k < response.text_area_work; k++) {
      textHeight.push(response.text_height[k].value)
      textWidth.push(response.text_width[k].value)
      textLeft.push(response.text_left[k].value)
      textTop.push(response.text_top[k].value)
      textRotate.push(response.text_rotate[k].value)

      fontSize.push(response.font_size[k].value)
      texts.push(response.texts[k].value)
      textColor.push(response.text_color[k].value)

      textFlip.push(response.text_flip[k].value)
      textFlop.push(response.text_flop[k].value)

      textCurve.push(response.text_curve[k].value)

      fontFamily.push(response.font_family[k].value)
    }

    let cropped = ''
    if (response.cropped !== 0) {
      cropped = '&cropped=' + response.cropped
    }

    // let compose = ''
    let imprintMethod = ''
    let text = ''
    // let rotate = ''
    let opacity = ''

    if (response.imprintMethod === 'fabric') {
      imprintMethod = response.imprintMethod + '=1'
    }
    if (response.imprintMethod === 'single_color') {
      imprintMethod = response.imprintMethod + '=' + response.imprintColor
    }
    if (response.imprintMethod === 'emboss') {
      imprintMethod = response.imprintMethod + '=1'
    }
    if (response.imprintMethod === 'firebranded') {
      imprintMethod = response.imprintMethod + '=1'
    }
    if (response.imprintMethod === 'wooden') {
      imprintMethod = response.imprintMethod + '=1'
    }
    if (response.imprintMethod === 'leather_engrave') {
      imprintMethod = response.imprintMethod + '=1'
    }
    if (response.imprintMethod === 'deboss') {
      imprintMethod = response.imprintMethod + '=1'
    }

    if (response.text !== '' && response.text !== null) {
      text = '&texts=' + texts.toString() + '&text_color=' + textColor.toString() + '&font_size=' + fontSize.toString() + '&area_w=' + textWidth.toString() + '&area_h=' + textHeight.toString() + '&text_h=' + textHeight.toString() + '&text_w=' + textWidth.toString() + '&text_c_x=' + textLeft.toString() + '&text_c_y=' + textTop.toString()
    }

    // if ((typeof (response.opacity) !== 'undefined') && (response.opacity !== '')) {
    //   rotate = '&opacity=' + response.opacity
    // }

    url = imageProcessingUrl + 'image-processing/' + mainImage + '?compose=1&' + imprintMethod + '&sig=KwROfoP_7DjY&a_width=' + response.artwork_width + '&a_height=' + response.artwork_height + '&a_l=' + response.artwork_left + '&a_t=' + response.artwork_top + '&height=' + imageHeight.toString() + '&width=' + imageWidth.toString() + '&compose_x=' + imageLeft.toString() + '&compose_y=' + imageTop.toString() + '&images=' + userUploadedImage.toString() + '&flip=' + flip.toString() + '&flop=' + flop.toString() + '&alignment=' + alignment.toString() + '&text_flip=' + textFlip.toString() + '&text_flop=' + textFlop.toString() + '&rotate=' + imageRotate.toString() + '&text_rotate=' + textRotate.toString() + '&font_family=' + fontFamily.toString() + '&text_curve=' + textCurve.toString() + '&back=' + background.toString() + '&text_alignment=' + textAlignment.toString() + '&layers=' + layers.reverse().toString() + '&c_h=' + response.productHeight + '&c_w=' + response.productWidth + cropped + text + opacity
    // console.log(url)
  } else {
    url = imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/' + response.productImage
  }
  return url
}
