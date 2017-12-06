import * as types from './mutation_types.js'
export default {
  [types.SET_IMAGE_URL]: (state, { url }) => {
    state.imageUrl = url
  },
  [types.SET_IS_UPLOAD]: (state, {val}) => {
    state.isUpload = val
  },
  [types.SET_USER_UPLOADED_IMAGE_NAME]: (state, {name}) => {
    state.userUploadedImageName = name
  },
  [types.SET_DEFAULT_IMPRINT_METHOD]: (state, {method}) => {
    state.defaultImprintMethod = method
  },
  [types.SET_IMAGE_CORDINATES]: (state, {cordinates}) => {
    state.imageCordinates = cordinates
  },
  [types.SET_IS_TEXT_ADDED]: (state, {value}) => {
    state.isTextAdded = value
  },
  [types.SET_TEXT]: (state, { value }) => {
    state.text = value
  },
  [types.SET_PRODUCT_IMAGE]: (state, { value }) => {
    state.productImage = value
  },
  [types.SET_IS_SELECTED_AREA]: (state, { value }) => {
    state.isSelectedArea = value
  },
  [types.SET_FONT_FAMILY]: (state, { fonts }) => {
    state.fontFamily = fonts
  },
  [types.SET_VIRTUAL_DATA]: (state, {virtual}) => {
    state.virtualData = virtual
  },
  [types.SET_PRODUCT_IMPRINT]: (state, {imprint}) => {
    state.productImprint.push(imprint)
  },
  [types.SET_PRODUCT_VARIATION_IMAGES]: (state, {images}) => {
    state.productVariationImages = images
  },
  [types.SET_IMPRINT_METHOD_IMAGE]: (state, {image}) => {
    state.imprintMethodImage = image
  }
}
