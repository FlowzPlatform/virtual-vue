<template>
  <div class="news-view">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <div class="container">
        <h1>Image Processing <span class="badge badge-secondary">Leafo</span></h1>
        <hr>

        <!-- <div class="row">
          <div class="col-2">
            <p>Select Image</p>
          </div>
          <div class="col-10">

          </div>
        </div> -->

        <div class="row">
            <div class="col-8">
              <div>
                  <img :src="imgUrl" />
              </div>
            </div>
            <div class="col-4">
              <form>
                <div class="form-group">
                  <input type="number" class="form-control" v-model="height" aria-describedby="emailHelp" placeholder="Height">
                </div>
                <div class="form-group">
                  <input type="number" class="form-control" v-model="width" placeholder="Width">
                </div>
                <div class="form-group">
                  <input type="number" min="1" max="360" class="form-control" v-model="rotate" placeholder="Rotate (0 to 360)">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="color" placeholder="Color (FFFFFF)">
                </div>
                <div class="form-group">
                  <input type="number" class="form-control" v-model="blur" placeholder="Blur (1 to 10)">
                </div>
                <div class="form-check">
                 <label class="form-check-label">
                   <input type="checkbox" value="1" class="form-check-input" v-model="flip">
                   Flip
                 </label>
               </div>
               <div class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" value="1" type="checkbox" v-model="flop">
                  Flop
                </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="negate">
                 Negate
               </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="emboss">
                 Emboss
               </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="fire">
                 Fire Branded
               </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="wooden">
                 Wooden (do not use png)
               </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="gel_dom">
                 Gel Dom
               </label>
              </div>

              <div class="form-check">
               <label class="form-check-label">
                 <input class="form-check-input" value="1" type="checkbox" v-model="toneontone">
                 Tone N Tone
               </label>
              </div>

              <button class="btn btn-primary" @click="generateImage">Submit</button>
              </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { imageProcessingUrl } from '../constants'
export default {
  name: 'Leafo-API',
  data () {
    return {
      img: 'Bill_Murray_small.jpg',
      height: '',
      width: '',
      rotate: '',
      color: '',
      imgUrl: '',
      blur: '',
      flip: '',
      flop: '',
      negate: '',
      emboss: '',
      fire: '',
      wooden: '',
      gel_dom: '',
      toneontone: ''
    }
  },
  methods: {
    generateImage (event) {
      event.preventDefault()
      let uri = '&h=' + this.height + '&w=' + this.width + '&rotate=' + this.rotate + '&single_color=' + this.color + '&flip=' + this.flip_v + '&flop=' + this.flop_v + '&negate=' + this.negate_v +
      '&emboss=' + this.emboss_v + '&fire=' + this.fire_v + '&blur=' + this.blur + '&wooden=' + this.wooden_v + '&gel_dome=' + this.gel_dom_v + '&toneontoneImage=' + this.toneontone_v
      this.imgUrl = imageProcessingUrl + 'image-effect/' + this.img + '?sig=KwROfoP_7DjY' + uri
    }
  },
  beforeMount () {
    this.imgUrl = imageProcessingUrl + 'image-effect/' + this.img + '?sig=KwROfoP_7DjY'
  },
  computed: {
    flip_v () {
      return this.flip ? 1 : ''
    },
    flop_v () {
      return this.flop ? 1 : ''
    },
    negate_v () {
      return this.negate ? 1 : ''
    },
    emboss_v () {
      return this.emboss ? 1 : ''
    },
    fire_v () {
      return this.fire ? 1 : ''
    },
    wooden_v () {
      return this.wooden ? 1 : ''
    },
    gel_dom_v () {
      return this.gel_dom ? 1 : ''
    },
    toneontone_v () {
      return this.toneontone ? 1 : ''
    }
  },
  mounted () {
  }
}
</script>

<style>
.col-8 img {
  max-width: 100%
},
.col-4 {
  text-align: left !important;
}
.form-check-input {
  margin-left: -1.25rem !important;
}


/* .row>[class^=col-] {
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: rgba(86,61,124,.15);
    border: 1px solid rgba(86,61,124,.2);
}
.col-8 {
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;

    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}
.col-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
} */
</style>
