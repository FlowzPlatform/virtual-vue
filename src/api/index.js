import { feathersClient } from './apiClient'
import { imageProcessingUrl } from '../constants'

export const createUpload = ({commit}, reader) => {
const uploadService = feathersClient.service('uploads');
return uploadService
    .create({uri: reader.result})
    .then(function(response){
      commit('setUserUploadedImageName', { name: response.id })
      return response;
    });
}

export const generateSequence = ({commit}, requestData) => {

  // console.log(JSON.stringify(requestData) + '   requestData');
  const uploadService = feathersClient.service('post-data');
  return uploadService
      .create(requestData)
      .then(function(response){
        let requestData = JSON.parse(response.request)
        let url = makeUrl(requestData)
        commit('setImageUrl', { url: url })
        return response;
      });
}

export const fontFamily = ({ commit }) => {
  const fontService = feathersClient.service('font-family')
  return fontService.find()
      .then(function(response){
        return response.data;
      });
}

export const productExist = ({ commit }, params) => {
  const product = feathersClient.service('product-exist')
  return product.find({query: params})
      .then(function(response){
        return response;
      });
}

export const supplierDetail = ({ commit }, params) => {
  const supplier = feathersClient.service('supplier-master')
  return supplier.find({query: params})
      .then(function(response){
        return response.data;
      });
}

export const productDetail = ({ commit }, params) => {
  const product = feathersClient.service('product-details')
  return product.find({query: params})
      .then(function(response){
        return response;
      });
}

export const makeUrl = (response) => {
  let url;

  if(response.image_area_work > 0 || response.text_area_work > 0){
    let userUploadedImage = []
    let image_height = []
    let image_width = []
    let image_left = []
    let image_top = []
    let image_rotate = []
    let alignment = []
    let background = []
    let text_height = []
    let text_width = []
    let text_left = []
    let text_top = []
    let font_size = []
    let texts = []
    let text_color = []
    let text_alignment = []
    let flip = []
    let flop = []
    let text_flip = []
    let text_flop = []
    let text_rotate = []
    let text_curve = []
    let font_family = []
    let layers = []

    let mainImage = '';

    mainImage = response.productImage
    let responseLayers = response.layers

    for (var i = 0; i < responseLayers.length; i++) {
      if(responseLayers[i].type == 'image'){
        let index = responseLayers[i].key+1
        layers.push('i-'+index)
      }else{
        let index = responseLayers[i].key+1
        layers.push('t-'+index)
      }
    }

    for (var i = 0; i < response.image_area_work; i++) {
      image_height.push(response.height[i].value)
      image_width.push(response.width[i].value)
      image_left.push(response.left[i].value)
      image_top.push(response.top[i].value)

      console.log(response.left[i].value)
      console.log(response.top[i].value)
      console.log(parseFloat(response.left[i].value)+parseFloat(response.artwork_left))
      console.log(parseFloat(response.top[i].value)+parseFloat(response.artwork_top))


      // image_left.push(parseFloat(response.left[i].value)+parseFloat(response.artwork_left))
      // image_top.push(parseFloat(response.top[i].value)+parseFloat(response.artwork_top))

      image_rotate.push(response.rotate[i].value)

      userUploadedImage.push(response.userUploadedImage[i].value)

      flip.push(response.flip[i].value)
      flop.push(response.flop[i].value)
      background.push(response.background[i].value)
    }

    for (var i = 0; i < response.text_area_work; i++) {
      text_height.push(response.text_height[i].value)
      text_width.push(response.text_width[i].value)
      text_left.push(response.text_left[i].value)
      text_top.push(response.text_top[i].value)
      text_rotate.push(response.text_rotate[i].value)

      font_size.push(response.font_size[i].value)
      texts.push(response.texts[i].value)
      text_color.push(response.text_color[i].value)

      text_flip.push(response.text_flip[i].value)
      text_flop.push(response.text_flop[i].value)

      text_curve.push(response.text_curve[i].value)

      font_family.push(response.font_family[i].value)
    }

    let cropped = ''
    if(response.cropped !== 0) {
      cropped = '&cropped='+response.cropped
    }

    let compose='';
    let imprintMethod='';
    let text='';
    let rotate='';
    let opacity = '';


    if(response.imprintMethod == 'fabric'){
      compose = '&compose=1';
      imprintMethod = response.imprintMethod+'=1'
    }
    if(response.imprintMethod == 'single_color'){
      compose = '&compose=1';
      imprintMethod = response.imprintMethod+'='+response.imprintColor
    }
    if(response.imprintMethod == 'emboss'){
      compose = '&compose=1';
      imprintMethod = response.imprintMethod+'=1'
    }
    if(response.imprintMethod == 'firebranded'){
      compose = '&compose=1';
      imprintMethod = response.imprintMethod+'=1'
    }
    if(response.imprintMethod == 'wooden'){
      compose = '&compose=1';
      imprintMethod = response.imprintMethod+'=1'
    }

    if(response.text!='' && response.text!== null){
      text = "&texts="+texts.toString()+"&text_color="+text_color.toString()+"&font_size="+font_size.toString()+"&area_w="+text_width.toString()+"&area_h="+text_height.toString()+"&text_h="+text_height.toString()+"&text_w="+text_width.toString()+"&text_c_x="+text_left.toString()+"&text_c_y="+text_top.toString()
    }

    if((typeof(response.opacity) != 'undefined') && (response.opacity !='')) {
        rotate = "&opacity="+response.opacity
    }

    url = imageProcessingUrl+'image-processing/'+mainImage+'?compose=1&'+imprintMethod+'&sig=KwROfoP_7DjY&a_width='+response.artwork_width+'&a_height='+response.artwork_height+'&a_l='+response.artwork_left+'&a_t='+response.artwork_top+'&height='+image_height.toString()+'&width='+image_width.toString()+'&compose_x='+image_left.toString()+'&compose_y='+image_top.toString()+'&images='+userUploadedImage.toString()+'&flip='+flip.toString()+'&flop='+flop.toString()+'&alignment='+alignment.toString()+'&text_flip='+text_flip.toString()+'&text_flop='+text_flop.toString()+'&rotate='+image_rotate.toString()+'&text_rotate='+text_rotate.toString()+'&font_family='+font_family.toString()+'&text_curve='+text_curve.toString()+'&back='+background.toString()+'&text_alignment='+text_alignment.toString()+'&layers='+layers.reverse().toString()+cropped+text+opacity;
    // console.log(url)
  }else{
      url =  imageProcessingUrl+'/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/'+response.productImage;
  }
  return url;
}
