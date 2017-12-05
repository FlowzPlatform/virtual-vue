import { imageProcessingUrl } from '../constants'
export default class Temp {

  constructor() {
    this.baseArea();
  }

  baseArea(){
    let this_ = this;

    $.widget( "virtualWorld.baseArea", {
        options: {
          rotate : 0,
          previous : 0,
          divid:""
        },
        _create: function() {
        },
        bindevent: function(id, imageSelectData) {
          id = this.element.imageArea('option','id')
          let currentEle = this.element

          if(this.element.imageArea('option','isMovable')=="1") {
            this.element.draggable({
              scroll: false,
              distance:1,
              create: function(event, ui) {
                this_.set_position(event, ui, currentEle.imageArea('option','id'), imageSelectData,'image', id);
                setTimeout(
                  function()
                  {
                    currentEle.trigger( "click" );
                  }, 2000);
              },
              start: function(event, ui) {
              },
              drag: function(event, ui){
                // this_.set_position(event, id, imageSelectData);
              },
              stop: function(event, ui) {
                this_.set_position(event, ui, currentEle.imageArea('option','id'), imageSelectData,'image', id);
                imageSelectData.generateSequence()
                currentEle.trigger( "click" );
              }
            });
          }
          if(this.element.imageArea('option','isEditable')=="1") {
            this.element.resizable({
              handles: 'e, w, n, s, se, ne, sw, nw',
              distance:1,
              start: function(event, ui) {

              },
              create: function(event, ui) {
                this_.set_position(event, ui, currentEle.imageArea('option','id'), imageSelectData, 'image', id);
                setTimeout(
                  function()
                  {
                    currentEle.trigger( "click" );
                  }, 2000);
              },
              resize: function(event, ui) {
                // this_.set_position(event, id, imageSelectData);
              },
              aspectRatio: true,
              stop: function(event, ui) {
                this_.set_position(event, ui, currentEle.imageArea('option','id'), imageSelectData, 'image', id);
                imageSelectData.generateSequence()
                currentEle.trigger( "click" );
              }
            });

            this.element.rotatable({
              rotate: function(event, ui){
                // console.log(event)
                // var degrees = ui.angle.current * 180/Math.PI
                // if ( degrees < 0 ) degrees += 360
                //
                // // contain angle between 0 and 180 degrees
                // if ( degrees > 270 ) {
                //   ui.angle.current = 0
                // } else if ( degrees > 180 ) {
                //   ui.angle.current = Math.PI
                // }
                // console.log(event)

              },
              start: function(event, ui) {
                // console.log(event)
              },
              stop: function(event, ui) {
                // console.log(event)
                // console.log(ui.angle)
                // console.log(ui.angle.current * 180/Math.PI)
                this_.set_position(event, ui, currentEle.imageArea('option','id'), imageSelectData, 'image', id);
                imageSelectData.generateSequence()
              }
            });
          }

          this.element.click(function() {
            let selected = $(this)
            if($(this).hasClass('child-selector')){
              $(this).parent().find('.vj-hotspot-selected').each(function(index){
                  $(this).removeClass('vj-hotspot-selected');
              })
              selected.addClass('vj-hotspot-selected');
            }else{
            }
            if(id) imageSelectData.$store.dispatch('setIsSelectedArea',{key: 'image',value: id } )
          });

          this.element.hover(function(){
            let selected = $(this)
            if(!$(this).hasClass('child-selector')){
              // $(this).parent().find('.vj-hotspot-selected').each(function(index){
              //     $(this).removeClass('vj-hotspot-selected');
              // })
              // selected.addClass('vj-hotspot-selected');
              selected.addClass('vj-hotspot-hover');
              selected.find('.vj-hotspotPreview').removeClass('hide')
            }

          },
          function(){
            $(this).removeClass('vj-hotspot-hover');
            $(this).find('.vj-hotspotPreview').addClass('hide')

          });
        },
        bindevent4text: function(id, imageSelectData) {
          id = this.element.textArea('option','id')
          let currentEle = this.element

          if(this.element.textArea('option','isMovable')=="1") {
            this.element.draggable({
              scroll: false,
              distance:1,
              create: function(event, ui) {
                this_.set_position(event, ui,currentEle.textArea('option','id'), imageSelectData, 'text', id);
                setTimeout(
                  function()
                  {
                    currentEle.trigger( "click" );
                  }, 2000);
              },
              drag: function(event, ui){

              },
              start: function(event, ui) {

              },
              stop: function(event, ui) {
                this_.set_position(event, ui,currentEle.textArea('option','id'), imageSelectData, 'text', id);
                imageSelectData.generateSequence()
                currentEle.trigger( "click" );
              }
            });

            this.element.rotatable({
              rotate: function(e, ui){

              },
              stop: function(event, ui) {
                this_.set_position(event, ui,currentEle.textArea('option','id'), imageSelectData, 'text', id);
                imageSelectData.generateSequence()
              }
            });
          }

          this.element.click(function() {
            let selected = $(this)
            if($(this).hasClass('child-selector')){
              $(this).parent().find('.vj-hotspot-selected').each(function(index){
                  $(this).removeClass('vj-hotspot-selected');
              })
              selected.addClass('vj-hotspot-selected');
            }else{
            }
            // imageSelectData.$store.state.isSelectedArea = id;
            if(id) imageSelectData.$store.dispatch('setIsSelectedArea',{key: 'text',value: id } )
            
          });

          this.element.hover(function(){
            let selected = $(this)
            if($(this).hasClass('child-selector')){
              $(this).parent().find('.vj-hotspot-selected').each(function(index){
                  $(this).removeClass('vj-hotspot-selected');
              })
              selected.addClass('vj-hotspot-selected');
            }
            if(id) imageSelectData.$store.dispatch('setIsSelectedArea',{key: 'text',value: id } )
            
          });
        },
        rotate: function(rotate,degree) {

        },
        textcurve: function(option){

        },
        flip: function(){

        },
        flop: function(){

        },
        removeblack: function(option){

        },
        removewhite: function(option){

        },
        align: function(alignval,elem){

        },
        imagealign: function(option) {

        }
    });
  }

  imageArea(className, imageSelectData){
    $.widget( "virtualWorld.imageArea", $.virtualWorld.baseArea , {
      options: {
        width: 200,
        height: 300,
        croppedimg: 0,
        id:0,
        flip:0,
        flop:0,
        removewhite:0,
        removeblack:0,
        layerid:0,
        imagealign:'center',
        imageurl: '',
        imageLeft: 0,
        imageTop: 0,
        isMovable: '1',
        isEditable: '1',
        isRemovable: '1',
        autoAlignedAfterEdit: '1',
        prefix: "obv-product-design-objects-image-",
        class: "vj-hotspot vj-objectArea-image",
        childelement : '<div id="vj-page_view_designObjects_i{id}-previewShell" class="vj-hotspotPreview"><i class="fa fa-repeat fa-2 rotate-icon" aria-hidden="true"></i></div>',
        zindex:0,
        defaultImprint: "",
        elementImprintMethod: [],
        singleColor: '000000',
        ckhId: ""
      },
      _setOption: function( key, value ) {
        // alert(key+"--"+value)
        this.options[ key ] = value;
        this._update();
      },
      _update: function() {
        console.log("_update");
      },
      _create: function() {
        // console.log(this.options.imageLeft+"==="+this.options.imageTop);

        this.element.css({'width': this.options.width,'height': this.options.height,'left': this.options.imageLeft,'top': this.options.imageTop,'position': 'absolute'});
        let id = this.options.id;
        this.options.childelement = this.options.childelement.replace("{id}", id);
			  this.element.append(this.options.childelement);
        this.bindevent(id, imageSelectData);
      },
      destroy: function() {

      },
      fixwidthheight: function() {

      },
      center: function(align) {

      },
      setSelected: function() {

      }
    });


    if(imageSelectData.id !== undefined){
        $('.'+className).imageArea('option','id',imageSelectData.id);
        // alert($('.'+className).imageArea('option','id'))
    }else{
      let passOptions = {
        id:imageSelectData.image_area_work,
        isMovable:imageSelectData.options.isMovable,
        isEditable:imageSelectData.options.isEditable,
        isRemovable:imageSelectData.options.isRemovable,
        width: imageSelectData.options.width,
        height: imageSelectData.options.height,
        imageLeft: imageSelectData.options.imageLeft,
        imageTop: imageSelectData.options.imageTop,
      }
      $('.'+className).imageArea(passOptions);
    }

  }

  textArea(className, imageSelectData){
    let rThis;
    $.widget( "virtualWorld.textArea", $.virtualWorld.baseArea, {
      options: {
        id:0,
        texturl: 'test',
        prefix: "obv-product-text-objects-text-",
        class: "vj-hotspot vj-objectArea-text",
        childelement : '<div id="vj-page_view_textObjects_i{id}-previewShell" class="vj-hotspotPreview"><i class="fa fa-repeat fa-2 rotate-icon" aria-hidden="true"></i></div>',
        textsize: 12,
        textcolor: '#000000',
        textfamily: "firstFontName",
        textalign: 'left',
        textopacity: 1,
        textLeft: '',
        textTop: '',
        isMovable: '1',
        isEditable: '1',
        isRemovable: '1',
        autoAlignedAfterEdit: '1',
        rotate: '0',
        textcurve: '0',
        zindex:0,
        defaultImprint: "",
        elementImprintMethod: [],
        singleColor: '000000',
        width: 200,
        height: 300
      },
      _setOption: function( key, value ) {

      },
      _update: function() {

      },
      _create: function() {
        this.element.css({'width': this.options.width,'height': this.options.height,'position': 'absolute'});
        let id = this.options.id;
        this.options.childelement = this.options.childelement.replace("{id}", id);
        this.element.append(this.options.childelement);
        this.bindevent4text(id, imageSelectData);
      },
      destroy: function() {

      },
      center: function(align) {

      },
      setSelected: function() {

      }
    });
    let passOptions = {
      id:imageSelectData.text_area_work,
      isMovable:imageSelectData.options.isMovable,
      isEditable:imageSelectData.options.isEditable,
      isRemovable:imageSelectData.options.isRemovable,
      width: imageSelectData.options.width,
      height: imageSelectData.options.height,
      width: imageSelectData.options.width,
      height: imageSelectData.options.height,
    }
    $('.'+className).textArea(passOptions);
  }

  set_position(event, ui, id, imageSelectData, type, hId){
    id--;
    // alert(id)

    if(type=='image'){
      //image width, leftN, leftS
      if(this.key_exists(id, imageSelectData.width) == true){
        imageSelectData.width[id].value=$(event.target).width()
        imageSelectData.leftN[id].value=$(event.target).width()/2-4
        imageSelectData.leftS[id].value=$(event.target).width()/2-4
      }else{
        imageSelectData.width.push({ key: id, type:type, value:$(event.target).width() });
        imageSelectData.leftN.push({ key: id, type:type, value:$(event.target).width()/2-4});
        imageSelectData.leftS.push({ key: id, type:type, value:$(event.target).width()/2-4});

        imageSelectData.userUploadedImageUrl.push({ key: id, type:type, value:imageProcessingUrl+'users/'+imageSelectData.$store.state.userUploadedImageName});
        imageSelectData.userUploadedImage.push({ key: id, type:type, value:imageSelectData.$store.state.userUploadedImageName });
        imageSelectData.layers.push({ key: id, hId: hId, type:type, value:imageSelectData.$store.state.userUploadedImageName });

      }

      //image height, topE, topW
      if(this.key_exists(id, imageSelectData.height) == true){
        imageSelectData.height[id].value=$(event.target).height()
        imageSelectData.topE[id].value=$(event.target).height()/2-4
        imageSelectData.topW[id].value=$(event.target).height()/2-4
      }else{
        imageSelectData.height.push({ key: id, type:type, value:$(event.target).height() });
        imageSelectData.topE.push({ key: id, type:type, value:$(event.target).height()/2-4});
        imageSelectData.topW.push({ key: id, type:type, value:$(event.target).height()/2-4});
      }

      //image flip
      if(this.key_exists(id, imageSelectData.flip) == true){

      }else{
        imageSelectData.flip.push({ key: id, type:type, value:'0'})
      }

      //image flop
      if(this.key_exists(id, imageSelectData.flop) == true){

      }else{
        imageSelectData.flop.push({ key: id, type:type, value:'0'})
      }

      //image rotate
      if(this.key_exists(id, imageSelectData.rotate) == true){
        if(typeof ui.angle != 'undefined') imageSelectData.rotate[id].value = ui.angle.current * 180/Math.PI
      }else{
        imageSelectData.rotate.push({ key: id, type:type, value:'0'})
      }

      //image rotate
      if(this.key_exists(id, imageSelectData.background) == true){

      }else{
        imageSelectData.background.push({ key: id, type:type, value:''})
      }



      //image top
      if(this.key_exists(id,  imageSelectData.top) == true){
        imageSelectData.top[id].value = $(event.target).offset().top-$('.obv-product-main-images').offset().top
      }else{
        imageSelectData.top.push({ key: id, type:type, value:$(event.target).offset().top-$('.obv-product-main-images').offset().top });
      }

      //image alignment
      if(this.key_exists(id,  imageSelectData.alignment) == true){
      }else{
        imageSelectData.alignment.push({ key: id, type:type, value:'' });
      }

      //image left
      if(this.key_exists(id,  imageSelectData.left) == true){
        imageSelectData.left[id].value = $(event.target).offset().left-$('.obv-product-main-images').offset().left
      }else{
        imageSelectData.left.push({ key: id, type:type, value: $(event.target).offset().left-$('.obv-product-main-images').offset().left });
      }

    }else{
      //text width, leftN, leftS
      if(this.key_exists(id, imageSelectData.text_width) == true){
        imageSelectData.text_width[id].value=$(event.target).width()
        imageSelectData.text_leftN[id].value=$(event.target).width()/2-4
        imageSelectData.text_leftS[id].value=$(event.target).width()/2-4
      }else{
        imageSelectData.text_width.push({ key: id, type:type, value:$(event.target).width() });
        imageSelectData.text_leftN.push({ key: id, type:type, value:$(event.target).width()/2-4});
        imageSelectData.text_leftS.push({ key: id, type:type, value:$(event.target).width()/2-4});
      }

      //text height, topE, topW
      if(this.key_exists(id, imageSelectData.text_height) == true){
        imageSelectData.text_height[id].value=$(event.target).height()
        imageSelectData.text_topE[id].value=$(event.target).height()/2-4
        imageSelectData.text_topW[id].value=$(event.target).height()/2-4
      }else{
        imageSelectData.text_height.push({ key: id, type:type, value:$(event.target).height() });
        imageSelectData.text_topE.push({ key: id, type:type, value:$(event.target).height()/2-4});
        imageSelectData.text_topW.push({ key: id, type:type, value:$(event.target).height()/2-4});
      }

      //text top
      if(this.key_exists(id,  imageSelectData.text_top) == true){
        imageSelectData.text_top[id].value = $(event.target).offset().top-$('.obv-product-main-images').offset().top
      }else{
        imageSelectData.text_top.push({ key: id, type:type, value:$(event.target).offset().top-$('.obv-product-main-images').offset().top });
      }

      //text left
      if(this.key_exists(id,  imageSelectData.text_left) == true){
        imageSelectData.text_left[id].value = $(event.target).offset().left-$('.obv-product-main-images').offset().left
      }else{
        imageSelectData.text_left.push({ key: id, type:type, value: $(event.target).offset().left-$('.obv-product-main-images').offset().left });
      }

      //text rotate
      if(this.key_exists(id, imageSelectData.text_rotate) == true){
        if(typeof ui.angle != 'undefined') imageSelectData.text_rotate[id].value = ui.angle.current * 180/Math.PI
      }else{
        imageSelectData.text_rotate.push({ key: id, type:type, value:'0'})
      }

      //text flip
      if(this.key_exists(id, imageSelectData.text_flip) == true){

      }else{
        imageSelectData.text_flip.push({ key: id, type:type, value:'0'})
      }

      //text flop
      if(this.key_exists(id, imageSelectData.text_flop) == true){

      }else{
        imageSelectData.text_flop.push({ key: id, type:type, value:'0'})
      }

      //font family
      if(this.key_exists(id, imageSelectData.font_family) == true){

      }else{
        imageSelectData.font_family.push({ key: id, type:type, value:'arial.ttf'})
      }

      //texts
      if(this.key_exists(id, imageSelectData.texts) == true){

      }else{
        imageSelectData.texts.push({ key: id, type:type, value:imageSelectData.text})
        imageSelectData.layers.push({ key: id, type:type, value:imageSelectData.text });
      }

      //text curve
      if(this.key_exists(id, imageSelectData.text_curve) == true){

      }else{
        imageSelectData.text_curve.push({ key: id, type:type, value:0})
      }

      //text alignment
      if(this.key_exists(id, imageSelectData.text_alignment) == true){

      }else{
        imageSelectData.text_alignment.push({ key: id, type:type, value:''})
      }

      //font size
      if(this.key_exists(id, imageSelectData.font_size) == true){

      }else{
        imageSelectData.font_size.push({ key: id, type:type, value:20})
      }

      //text color
      if(this.key_exists(id, imageSelectData.text_color) == true){
        imageSelectData.text_color[id].value=imageSelectData.$store.state.imageCordinates.imprintColor
      }else{
        if(imageSelectData.$store.state.imageCordinates.imprintColor !== undefined)imageSelectData.text_color.push({ key: id, type:type, value:imageSelectData.$store.state.imageCordinates.imprintColor})
        else imageSelectData.text_color.push({ key: id, type:type, value:'000000'})
      }
    }

    //
    // if(this.key_exists(id, imageSelectData.width) == true){
    //   imageSelectData.width[id].value=$(event.target).width()
    //   imageSelectData.leftN[id].value=$(event.target).width()/2-4
    //   imageSelectData.leftS[id].value=$(event.target).width()/2-4
    // }else{
    //   if(type=='image'){
    //     imageSelectData.userUploadedImageUrl.push({ key: id, type:type, value:imageProcessingUrl+'users/'+imageSelectData.$store.state.userUploadedImageName});
    //     imageSelectData.userUploadedImage.push({ key: id, type:type, value:imageSelectData.$store.state.userUploadedImageName });
    //   }else{
    //   }
    //   imageSelectData.width.push({ key: id, type:type, value:$(event.target).width() });
    //   imageSelectData.leftN.push({ key: id, type:type, value:$(event.target).width()/2-4});
    //   imageSelectData.leftS.push({ key: id, type:type, value:$(event.target).width()/2-4});
    // }
    //
    // if(this.key_exists(id, imageSelectData.texts) == true){
    //
    // }else{
    //   imageSelectData.texts.push({ key: id, type:type, value:imageSelectData.text})
    // }
    //
    // if(this.key_exists(id, imageSelectData.font_size) == true){
    //
    // }else{
    //   imageSelectData.font_size.push({ key: id, type:type, value:20})
    // }
    //
    // if(this.key_exists(id, imageSelectData.text_color) == true){
    //   imageSelectData.text_color[id].value=imageSelectData.$store.state.imageCordinates.imprintColor
    // }else{
    //   if(imageSelectData.$store.state.imageCordinates.imprintColor !== undefined)imageSelectData.text_color.push({ key: id, type:type, value:imageSelectData.$store.state.imageCordinates.imprintColor})
    //   else imageSelectData.text_color.push({ key: id, type:type, value:'000000'})
    // }
    //
    // if(this.key_exists(id, imageSelectData.flip) == true){
    //
    // }else{
    //   if(type=='image')imageSelectData.flip.push({ key: id, type:type, value:'0'})
    // }
    // if(this.key_exists(id, imageSelectData.flop) == true){
    //
    // }else{
    //   if(type=='image')imageSelectData.flop.push({ key: id, type:type, value:'0'})
    // }
    // if(this.key_exists(id, imageSelectData.text_flip) == true){
    //
    // }else{
    //   if(type=='text')imageSelectData.text_flip.push({ key: id, type:type, value:'0'})
    // }
    // if(this.key_exists(id, imageSelectData.text_flop) == true){
    //
    // }else{
    //   if(type=='text')imageSelectData.text_flop.push({ key: id, type:type, value:'0'})
    // }
    //
    // if(this.key_exists(id, imageSelectData.height) == true){
    //   imageSelectData.height[id].value=$(event.target).height()
    //   imageSelectData.topE[id].value=$(event.target).height()/2-4
    //   imageSelectData.topW[id].value=$(event.target).height()/2-4
    // }else{
    //   imageSelectData.height.push({ key: id, type:type, value:$(event.target).height() });
    //   imageSelectData.topE.push({ key: id, type:type, value:$(event.target).height()/2-4});
    //   imageSelectData.topW.push({ key: id, type:type, value:$(event.target).height()/2-4});
    // }
    //
    // if(this.key_exists(id,  imageSelectData.top) == true){
    //   imageSelectData.top[id].value = $(event.target).offset().top-$('.obv-product-main-images').offset().top
    // }else{
    //   imageSelectData.top.push({ key: id, type:type, value:$(event.target).offset().top-$('.obv-product-main-images').offset().top });
    // }
    //
    // if(this.key_exists(id,  imageSelectData.left) == true){
    //   imageSelectData.left[id].value = $(event.target).offset().left-$('.obv-product-main-images').offset().left
    // }else{
    //   imageSelectData.left.push({ key: id, type:type, value: $(event.target).offset().left-$('.obv-product-main-images').offset().left });
    // }

  }

  key_exists(key, arr) {
    let keys = Object.keys(arr)
    for(var i = 0; i < arr.length; i++) {
      if( keys[i] == key )
            return true;
    }
    return false;
  }

  addImageProcess(src){
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    });
  }

  imageCordinates(imageProps, width, height){
    /**formuala**/
    // (original height / original width) x new width = new height


    //TODO this needs to change
    // let height=300;
    // let width=200;

    let imgCordinates = {
      height: imageProps.height,
      width: imageProps.width
    };
    let origH = imageProps.height;
    let origW = imageProps.width;

    if(imageProps.width>width){
      imgCordinates.width = width;
      imgCordinates.height = imgCordinates.width*origH/origW;
    }
    if(imgCordinates.height>height){
      imgCordinates.height = height;
      imgCordinates.width = imgCordinates.height*origW/origH;
    }
    return imgCordinates;
  }
}
