import { createUpload } from '../api/index'
import { generateSequence, fontFamily, productExist, supplierDetail, productDetail } from '../api/index'
import { imageProcessingUrl } from '../constants'

export default {

    fetchImageUrl: async({ commit }, reader) => {
      let res = await createUpload({ commit }, reader);
       commit('setIsUpload', { val: true })
    },
    cropImage: ({commit, state}, data) => {
      let cropImage  = data.cropImage
      let cropImageXAxis = data.cropAxis.x
      let cropImagYAxis = data.cropAxis.y
      let cropImageHAxis=data.cropAxis.h
      let cropImageWAxis=data.cropAxis.w
      let url = imageProcessingUrl + 'crop?image='+cropImage+'&h='+cropImageHAxis+'&w='+cropImageWAxis+'&x='+cropImageXAxis+'&y='+cropImagYAxis
        $.ajax({
        type: "GET",
        contentType:'application/json',
        dataType: 'jsonp',
        crossDomain: true,
        url:url,
        success: function(data) {

          // console.log( 'if went wrong', status, err );
          // generateSequence(state.imageCordinates);
          return TRUE
        },error: function( req, status, err ) {


            return status
            // console.log( JSON.stringify(state.imageCordinates) + ' '  + ' >> ');
            // let a = JSON.parse(state.imageCordinates)
            // console.log(JSON.stringify(a));
              // generateSequence();
            // generateSequence(state.imageCordinates);
        }
      });
     },
    generateSequence: async({commit, state}, data) => {
      let uuid = require("uuid");
      let sequence = uuid.v4();
      data.imprintMethod = state.defaultImprintMethod;
      data.imprintColor = state.imageCordinates.imprintColor;
      data.rotate = state.imageCordinates.rotate;
      data.opacity = state.imageCordinates.opacity;
      data.text = state.text;
      data.productImage = state.productImage;
        let postData = {
        request:JSON.stringify(data),
        sequence:sequence,
        session:'a blank value',
        companyId:'a blank value'
      }
      let res = await generateSequence({ commit }, postData);
      commit('setIsUpload', { val: false })
      commit('setIsTextAdded', { value: false })
    },

    defaultImprintMethod: async({ commit }, method) => {
      let res = await createUpload({ commit }, reader);
      commit('setDefaultImprintMethod', { val: method })
    },

    addText: async ({ commit }) => {
      let res = await createUpload({ commit }, reader);
      commit('setIsUpload', { val: true })
    },

    fetchFontFamily: async ({ commit }) => {
      let res = await fontFamily({ commit });
      commit('setFontFamily', { fonts: res })
    },

    productExist: async ({ commit, state}) => {
      let params = {
        supplierMasterId: state.virtualData.supplier,
        sku: state.virtualData.sku,
        status: true,
        personalized: 1
      }

      let res = await productExist({ commit }, params);
      return res
    },

    supplierDetail: async ({ commit, state}) => {
      let params
      if (state.virtualData.reference) {
        params = {
          referenceId: state.virtualData.reference
        }
      } else {
        params = {
          supplierId: state.virtualData.supplier,
        }
      }
      let res = await supplierDetail({ commit }, params);
      return res
    },

    productDetail: async ({ commit, state}, queryParams) => {
      console.log(queryParams)
      let res = await productDetail({ commit }, queryParams);
      return res
    }
}
