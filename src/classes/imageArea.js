$(document).ready(function(){
  $.fn.virtualWorld = {};
  $.fn.virtualWorld.defaults = {
    product_id: "",
    sequenceId: '',
    container: '#product_image',
    session: '',
    response: {},
    zindex: 0,
    textareacount: 0,
    imageareacount: 0,
    imprint_method: [],
    side_id: 1,
    current_variation_color: 1,
    total_no_of_sides: 1,
    sidesequence: [],
    wraparound:"isWraparound",
    wraparoundcounter:1,
    wraparoundsiderequest:[],
    showareaselectflag:1,
    currentproductpage:1,
    currentprojectselected: '',
    layersidevise: [],
    layersequencesidevise: [],
    single_color: [],
    hotstamp_color: [],
    glass_color: [],
    apply_color: [],
    foil_color: [],
    emb_color: [],
    dome_plate_color: [],
    side_pms_color: [],
    side_single_color: [],
    current_side_temp:1,
    virtualLibraryLoadFlag:0,
    currentSelectedArea:[],
    currentedittextareaid:'',
    lastappliedartworksequence:'',
    lastsavedartworksequence:'',
    currentEditedArea:'',
    currentEditedAreaLayerId:'',
    initializeZoom:0,
    ignoreAspectRatio:0,
    scalex:[],
    scaley:[],
    rotate:[],
    tileRows:[],
    tileColumns:[],
    tileHSpace:[],
    tileVSpace:[],
    selectedArea:'',
    beforeChangedStyle:'',
    imagesDimensions:[],
    userId:"userId",
    obProductId:"obProductId",
    selectedImprintMethod:'',
    doubleClickInterval:null,
    sequences:[]
  };

  $.widget( "virtualWorld.baseArea", {
      options: {
        rotate : 0,
        previous : 0,
        divid:""
      },
      _create: function() {
      },
      bindevent: function() {
        if(this.element.imageArea('option','isMovable')=="1") {
          this.element.draggable({
            scroll: false,
            distance:1,
            create: function(event, ui) {

            },
            start: function(event, ui) {

            },
            stop: function(event, ui) {

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

            },
            aspectRatio: true,
            stop: function(event, ui) {

            }
          });
        }
        this.element.click(function() {

        });
      },
      bindevent4text: function() {
        if(this.element.textArea('option','isMovable')=="1") {
          this.element.draggable({
            scroll: false,
            distance:1,
            create: function(event, ui) {

            },
            start: function(event, ui) {

            },
            stop: function(event, ui) {

            }
          });
        }
        this.element.click(function() {

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
      imageLeft: '',
      imageTop: '',
      isMovable: '1',
      isEditable: '1',
      isRemovable: '1',
      autoAlignedAfterEdit: '1',
      prefix: "obv-product-design-objects-",
      class: "vj-hotspot vj-objectArea-image",
      childelement : '<div id="vj-page_view_designObjects_i{id}-previewShell" class="vj-hotspotPreview"></div>',
      zindex:0,
      defaultImprint: "",
      elementImprintMethod: [],
      singleColor: '000000',
      ckhId: ""
    },
    _setOption: function( key, value ) {
      this.options[ key ] = value;
      this._update();
    },
    _update: function() {

    },
    _create: function() {
      console.log("created");
      this.bindevent();
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

  $.widget( "virtualWorld.textArea", $.virtualWorld.baseArea, {
    options: {
      id:0,
      texturl: 'test',
      prefix: "obv-product-text-objects-",
      class: "vj-hotspot vj-objectArea-text",
      childelement : '<div id="vj-page_view_textObjects_i{id}-previewShell" class="vj-hotspotPreview"></div>',
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
      singleColor: '000000'
    },
    _setOption: function( key, value ) {

    },
    _update: function() {},
    _create: function() {

    },
    destroy: function() {

    },
    center: function(align) {

    },
    setSelected: function() {

    }
  });
});
