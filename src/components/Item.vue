<template>

  <div class="big-card md-layout md-gutter">

    <div class="left-part md-layout-item md-layout md-gutter md-xsmall-size-75 md-small-size-75 md-xsmall-size-75 md-medium-size-75 md-large-size-75 md-xlarge-size-75">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
        <h2 class="item-title">{{ item.name }}</h2>
      </div>
      <div class="property-container md-layout-item md-layout md-gutter md-xsmall-size-50 md-small-size-33 md-xsmall-size-33 md-medium-size-33 md-large-size-33 md-xlarge-size-33">
        <h3 class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property-title">Price</h3>
        <span class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property">${{ item.price }}</span>
      </div>
      <div class="property-container md-layout-item md-layout md-gutter md-xsmall-size-50 md-small-size-33 md-xsmall-size-33 md-medium-size-33 md-large-size-33 md-xlarge-size-33">
        <h3 class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property-title">Release Date</h3>
        <span class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property">{{ item.releaseDate | formatDate }}</span>
      </div>
      <div class="property-container md-layout-item md-layout md-gutter md-xsmall-size-50 md-small-size-33 md-xsmall-size-33 md-medium-size-33 md-large-size-33 md-xlarge-size-33">
        <h3 class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property-title">Category</h3>
        <span class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property">{{ item.category }}</span>
      </div>
      <div class="md-layout-item md-layout md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
        <h3 class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100 item-property-title">Description</h3>
        <div v-html="item.description"  @focusout="editDesc()" v-bind:class="{ 'textarea': editing }" :contenteditable="editing ? true : false" class="description md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100"></div>
      </div>
    </div>
    <div class="md-layout-item md-xsmall-size-25 md-small-size-25 md-xsmall-size-25 md-medium-size-25 md-large-size-25 md-xlarge-size-25">
      <img class="item-image" v-bind:src="item.image">
    </div>

    <div @click.stop="starItem()" class="star" v-bind:class="{ 'starred': item.starred }">
      <md-icon class="checked">star</md-icon>
      <md-icon class="unchecked">star_border</md-icon>
    </div>

    <div @click.stop="toggleEditMode()" class="edit" v-bind:class="{ 'editing': editing }">
      <md-icon class="no">edit</md-icon>
      <md-icon class="yes">check</md-icon>
    </div>

  </div>
</template>

<script>

import Vue from 'vue';

import axios from 'axios'

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

export default {
  name: 'Item',
  data () {
    return {
      item: [],
      errors: [],
      editing: false
    }
  },
  created () {
    axios.get(`https://google-store.herokuapp.com/item/` + this.$route.params.id)
    .then(response => {
      this.item = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    starItem: function () {
      if (this.item.starred) {
        this.item.starred = false;
      }
      else {
        this.item.starred = true;
      }
      axios.put(`https://google-store.herokuapp.com/item/` + this.item._id, this.item)
      .catch(e => {
        this.errors.push(e);
      });
    },
    toggleEditMode: function () {
      if(this.editing) {
        this.editing = false;
      }
      else {
        this.editing = true;
      }
    },
    editDesc: function () {
      this.item.description = document.querySelector(".description").innerHTML;
      axios.put(`https://google-store.herokuapp.com/item/` + this.item._id, this.item)
      .then(response => {
        console.log('success');
      })
      .catch(e => {
        this.errors.push(e);
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .big-card {
    width: 90%;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin-left: auto;
    margin-right: auto;
    margin-top: 9.5rem;
    padding-top: 3rem;
    padding-bottom: 2rem;
    padding-left: 1.5rem;
    position: relative;
    min-height: 23rem;
  }

  @media (min-width: 75em) {
    .big-card {
      width: 80%;
    }
  }

  @media (min-width: 90.625em) {
    .big-card {
      width: 70%;
    }
  }

  .left-part {
    max-height: 16rem;
  }

  .item-image {
    width: 100%;
  }

  .item-title {
    font-size: 2.4rem;
    color: #727276;
    margin-top: 0;
  }

  .property-container {
    height: 5rem;
  }

  .item-property-title {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 0.2rem;
  }

  .item-property {
    font-size: 1.6rem;
    margin-top: 0;
    color: #448aff;
  }

  .star {
    position: absolute;
    right: 1.6rem;
    top: 1rem;
    cursor: pointer;
  }

  .checked {
    color: #448aff !important;
  }

  .star .checked {
    display: none;
  }

  .star .unchecked {
    display: block;
  }

  .star.starred .checked {
    display: block;
  }

  .star.starred .unchecked {
    display: none;
  }

  .edit {
    position: absolute;
    left: 2.5rem;
    bottom: 1rem;
    cursor: pointer;
  }

  .no {
    color: #448aff !important;
  }

  .yes {
    color:  #00E676 !important;
  }

  .edit .yes {
    display: none;
  }

  .edit .no {
    display: block;
  }

  .edit.editing .yes {
    display: block;
  }

  .edit.editing .no {
    display: none;
  }

  .textarea {
    border: solid 1px #448aff;
    border-radius: 2px;
    padding: 0.5rem;
  }

  .textarea:focus {
    border: solid 1px #448aff;
    border-radius: 2px;
    box-shadow: none;
  }

</style>
