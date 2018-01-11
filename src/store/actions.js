/*eslint-disable */
import { createUpload, generateSequence, fontFamily, productExist, supplierDetail, productDetail, imageEffect } from '../api/index'
import { imageProcessingUrl } from '../constants'
import * as types from './mutation_types.js'

export default {

  fetchImageUrl: async ({ commit }, reader) => {
    let res = await createUpload({ commit }, reader)
    commit(types.SET_IS_UPLOAD, { val: true })
    commit(types.SET_USER_UPLOADED_IMAGE_NAME, { name: res.id })
  },

  cropImage: ({commit, state}, data) => {
    let cropImage = data.cropImage
    let cropImageXAxis = data.cropAxis.x
    let cropImagYAxis = data.cropAxis.y
    let cropImageHAxis = data.cropAxis.h
    let cropImageWAxis = data.cropAxis.w
    let url = imageProcessingUrl + 'crop?image=' + cropImage + '&h=' + cropImageHAxis + '&w=' + cropImageWAxis + '&x=' + cropImageXAxis + '&y=' + cropImagYAxis

    $.ajax({
      type: 'GET',
      url: url,
      success: function (data) {
        return true
      },
      error: function (req, status, err) {
        return status
      }
    })
  },

  generateSequence: async ({commit, state}, data) => {
    let uuid = require('uuid')
    let sequence = uuid.v4()
    data.imprintMethod = state.defaultImprintMethod
    data.imprintColor = state.imageCordinates.imprintColor
    data.rotate = state.imageCordinates.rotate
    data.opacity = state.imageCordinates.opacity
    data.text = state.text
    data.productImage = state.productImage
    data.currentUploadedImage = state.userUploadedImageName
    data.isSelectedArea = state.isSelectedArea
  
    /* Different api */
    let cachedI = state.imageCordinates.cachedImages
    let sArea = data.isActive
    let index = sArea.key
    let type = sArea.type


    let imprintMethod
    if(data.imprintMethod === 'single_color' || data.imprintMethod === 'one_color') {
      imprintMethod = data.imprintMethod + '=' + data.imprintColor
    } else if(data.imprintMethod === 'firebranded') {
      imprintMethod = 'fire=1'
    } else if(data.imprintMethod === 'glass') {
      imprintMethod = data.imprintMethod + '=' + data.imprintColor
    } else if(data.imprintMethod === 'hot_stamp') {
      imprintMethod = data.imprintMethod + '=' + data.imprintColor
    } else {
      imprintMethod = data.imprintMethod + '=1'
    }

    

    let uri = '?' +  imprintMethod + '&h=' + data.height[index].value + '&w=' + data.width[index].value + '&rotate=' + data.rotate[index].value + 
    '&flip=' + data.flip[index].value + '&flop=' + data.flop[index].value + '&sig=KwROfoP_7DjY'
    let resp = await imageEffect({ commit }, data.currentUploadedImage, uri)
    // save cached images
    if (state.imageCordinates.isActive !== null) {
      if (cachedI[state.imageCordinates.isActive.key] !== undefined) {
        data.cachedImages[sArea.key] = resp.image
      } else {
        data.cachedImages.push(resp.image)
      }
    }
    /* api end */

    let postData = {
      request: JSON.stringify(data),
      sequence: sequence,
      session: 'a blank value',
      companyId: 'a blank value'
    }

    let res = await generateSequence({ commit }, postData)
    commit(types.SET_IMAGE_URL, {url: res.url})
    commit(types.SET_IS_UPLOAD, { val: false })
    commit(types.SET_IS_TEXT_ADDED, { value: false })
  },

  defaultImprintMethod: async ({ commit }, method) => {
    commit(types.SET_DEFAULT_IMPRINT_METHOD, { val: method })
  },

  addText: async ({ commit }) => {
    commit(types.SET_IS_UPLOAD, { val: true })
  },

  fetchFontFamily: async ({ commit }) => {
    let res = await fontFamily({ commit })
    commit(types.SET_FONT_FAMILY, { fonts: res })
  },

  productExist: async ({commit, state}) => {
    let params = {
      supplierMasterId: state.virtualData.supplier,
      sku: state.virtualData.sku,
      status: true,
      personalized: 1
    }

    let res = await productExist({ commit }, params)
    return res
  },

  supplierDetail: async ({commit, state}) => {
    let params
    if (state.virtualData.reference) {
      params = {
        referenceId: state.virtualData.reference
      }
    } else {
      params = {
        supplierId: state.virtualData.supplier
      }
    }
    let res = await supplierDetail({ commit }, params)
    return res
  },

  productDetail: async ({commit, state}, queryParams) => {
    let res = await productDetail({ commit }, queryParams)
    return res
  },

  setVirtualData: ({commit, state}, data) => {
    commit(types.SET_VIRTUAL_DATA, { virtual: data })
  },

  setProductImprint: ({commit, state}, data) => {
    commit(types.SET_PRODUCT_IMPRINT, { imprint: data })
  },
  setProductVariationImages: ({commit, state}, data) => {
    commit(types.SET_PRODUCT_VARIATION_IMAGES, { images: data })
  },
  setProductImage: ({commit, state}, data) => {
    commit(types.SET_PRODUCT_IMAGE, { value: data })
  },
  setImageUrl: ({commit, state}, data) => {
    commit(types.SET_IMAGE_URL, { url: data })
  },
  setIsTextAdded: ({commit, state}, data) => {
    commit(types.SET_IS_TEXT_ADDED, { value: data })
  },
  setText: ({commit, state}, data) => {
    commit(types.SET_TEXT, { value: data })
  },
  setImageCordinates: ({commit, state}, data) => {
    commit(types.SET_IMAGE_CORDINATES, { cordinates: data })
  },
  setIsSelectedArea: ({commit, state}, data) => {
    commit(types.SET_IS_SELECTED_AREA, { value: data })
  },
  setDefaultImprintMethod: ({commit, state}, data) => {
    commit(types.SET_DEFAULT_IMPRINT_METHOD, { method: data })
  },
  setImprintMethodImage: ({commit, state}, data) => {
    commit(types.SET_IMPRINT_METHOD_IMAGE, { image: data })
  }
}
