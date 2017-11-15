export default {
    setImageUrl: (state,{ url } ) => {
      state.imageUrl = url
    },
    setIsUpload: (state, {val}) => {
      state.isUpload = val
    },
    setUserUploadedImageName: (state, {name}) => {
      state.userUploadedImageName = name
    },
    setDefaultImprintMethod: (state, {method}) => {
     state.defaultImprintMethod = method
    },
    setImageCordinates: (state, {cordinates}) => {
      state.imageCordinates = cordinates
    },
    setIsTextAdded: (state, {value}) => {
      state.isTextAdded = value
    },
    setText: (state, { value }) => {
      state.text = value
    },
    setProductImage: (state, { value }) => {
      state.productImage = value
    },
    setIsSelectedArea: (state, { value }) => {
      state.isSelectedArea = value
    },
    setFontFamily: (state, { fonts }) => {
      state.fontFamily = fonts
    },
    setVirtualData: (state, {virtual}) => {
      state.virtualData = virtual
    },
    setProductImprint: (state, {imprint}) => {
      state.productImprint.push(imprint)
    },
    setProductVariationImages: (state, {images}) => {
      state.productVariationImages = images
    },
    setImprintMethodImage: (state, {image}) => {
      state.imprintMethodImage = image
    }
}
