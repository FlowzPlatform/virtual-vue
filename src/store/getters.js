export default {
  getImageUrl: (state) => {
      return state.imageUrl
  },
  getIsUpload: (state) =>{
    return state.isUpload
  },
  getUserUploadedImageName: (state) =>{
    return state.userUploadedImageName
  },
  getDefaultImprintMethod: (state) =>{
    return state.defaultImprintMethod
  },
  getImageCordinates: (state) =>{
    return state.imageCordinates
  },
  getIsTextAdded: (state) =>{
    return state.isTextAdded
  },
  getText: (state) =>{
    return state.text
  },
  getFontFamily: (state) =>{
    return state.fontFamily
  },
  getIsSelectedArea: (state) =>{
    return state.isSelectedArea
  },
  getProductVariationImages: (state) =>{
    return state.productVariationImages
  },
  getProductImage: (state) =>{
    return state.productImage
  }
}
