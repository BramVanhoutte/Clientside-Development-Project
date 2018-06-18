<template>
  <div class="page clearfix">
    <div @click.stop="toggleSideMenu()" class="side-menu-buttons" v-bind:class="{ 'opened': filterSidemenuOpen } ">
      <md-icon class="menu">menu</md-icon>
      <md-icon class="close">close</md-icon>
    </div>
    <div class="container-filter">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
          <h2>Filters</h2>
        </div>
        <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
          <md-field>
            <label for="categories">Show Category</label>
            <md-select v-model="selectedCategory" name="categories" id="categories" placeholder="Show Category">
              <md-option value="All">All</md-option>
              <md-option value="Devices">Devices</md-option>
              <md-option value="Smarthome">Smarthome</md-option>
              <md-option value="Accessories">Accessories</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
          <md-field>
            <label>Max Price</label>
            <md-input v-model="maxPrice" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100">
          <md-checkbox v-model="onlyStarred" v-on:change="filterItems()" class="md-primary">Only show starred items</md-checkbox>
        </div>
      </div>
    </div>
    <div class="container-cards md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25" v-for="item in filteredItems" :key="item.id">
        <div class="item" @click.stop="detailPage(item)">
          <img class="item-image" v-bind:src="item.image">
          <h3 class="item-title">{{ item.name }}</h3>
          <p class="item-info">From <span class="item-price">${{ item.price }}</span></p>
          <div @click.stop="starItem(item._id)" class="star" v-bind:class="{ 'starred': item.starred } ">
            <md-icon class="checked">star</md-icon>
            <md-icon class="unchecked">star_border</md-icon>
          </div>
        </div>
      </div>
      <!-- <item-card v-for="item in items" v-bind:item="item" v-bind:key="item.id"></item-card> -->
    </div>

  </div>
</template>

<script>

  import Vue from 'vue';

  import axios from 'axios'

  export default {
    name: 'Home',
    data () {
      return {
        items: [],
        errors: [],
        filteredItems: [],
        possibleCategories: [ 'All', 'Devices', 'Smarthome', 'Accessories' ],
        selectedCategory: 'All',
        lastSelectedCategory: 'All',
        maxPrice: 0,
        lastMaxPrice: 0,
        onlyStarred: false,
        filterSidemenuOpen: true
      }
    },
    created () {
      axios.get(`https://google-store.herokuapp.com/item`)
      .then(response => {
        this.items = response.data;
        this.filteredItems = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    updated () {
      if(this.lastSelectedCategory !== this.selectedCategory || this.maxPrice !== this.lastMaxPrice) {
        this.lastSelectedCategory = this.selectedCategory;
        this.lastMaxPrice = this.maxPrice;
        this.filterItems();
      }
    },
    mounted () {
      document.title = 'Google Store';
    },
    methods: {
      detailPage: function(item) {
        this.$router.push({
          name: 'Item',
          params: { id: item._id }
        })
      },
      filterItems: function() {
        var selectedCat = this.selectedCategory;
        var maxP = this.maxPrice;
        this.filteredItems = this.items;
        if (this.selectedCategory !== 'All') {
          this.filteredItems = this.items.filter(function(item) {
            return item.category === selectedCat;
          });
        }
        if (this.maxPrice >= 0) {
          if(this.maxPrice !== 0) {
            this.filteredItems = this.filteredItems.filter(function(item) {
              return item.price <= maxP;
            });
          }
        }
        else {
          this.lastMaxPrice = 0;
          this.maxPrice = 0;
        }
        if(this.onlyStarred) {
           this.filteredItems = this.filteredItems.filter(function(item) {
              return item.starred;
            });
        }
      },
      toggleSideMenu: function () {
        
      },
      starItem: function (id) {
        if (this.items.find(x => x._id === id).starred) {
          this.items.find(x => x._id === id).starred = false;
        }
        else {
          this.items.find(x => x._id === id).starred = true;
        }
        axios.put(`https://google-store.herokuapp.com/item/` + this.items.find(x => x._id === id)._id, this.items.find(x => x._id === id))
        .catch(e => {
          this.errors.push(e);
        });
      }
    }
  }
  
  // Vue.component('item-card', {
  //   props: ['item'],
  //   template: '\
  //     <li class="item" v-for="item in items" :key="item.id" @click.stop="details(item)">\
  //       <img class="item-image" v-bind:src="item.image">\
  //       <h3 class="item-title">{{ item.name }}</h3>\
  //       <p class="item-info">From <span class="item-price">${{ item.price }}</span></p>\
  //     </li>',
  // });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



  .page {
    width: 90%;
    display: block;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 9.5rem;
  }

  .item {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-color: white;
    margin-bottom: 2rem;
    cursor: pointer;
    position: relative;
  }

  .container-filter {
    width: 26rem;
    padding-left: 2.5rem;
    padding-right: 1.5rem;
    position: fixed;
    padding-top: 9.5rem;
    top: 0;
    left: -26rem;
    height: 100%;
    z-index: 19;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
  }

  .container-cards {
    width: 100%;
  }

  @media (min-width: 50em) {

    .container-filter {
      position: static;
      margin-right: 4rem;
      float: left;
      background-color: transparent;
      box-shadow: none;
      padding: 0;
      width: 22rem;
    }

    .container-cards {
      width: calc(100% - 26rem);
      float: left;
    }
  }

  .item:nth-of-type(3n) {
     margin-right: 0;
  }

  .item-image {
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    display: block;
    user-select: none;
  }

  .item-title {
    color: #727276;
    font-size: 1.6rem;
    margin-left: 2rem;
    display: block;
    margin-bottom: 0;
  }

  .item-info {
    margin-top: 0;
    margin-left: 2.2rem;
    padding-bottom: 5%;
    font-size: 1.2rem;
  }

  .item-price {
    color: #448aff;
  }

  .star {
    position: absolute;
    right: 1.6rem;
    bottom: 5%;
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

  .side-menu-buttons {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 21;
    height: 5.6rem;
    width: 4rem;
    margin-left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-menu-buttons .menu {
    display: block;
  }

  .side-menu-buttons .close {
    display: none;
  }

  .side-menu-buttons.opened .menu {
    display: none;
  }

  .side-menu-buttons.opened .close {
    display: block;
  }

  @media (min-width: 50em) {

    .side-menu-buttons .menu {
      display: none;
    }

    .side-menu-buttons .close {
      display: none;
    }

    .side-menu-buttons.opened .menu {
      display: none;
    }

    .side-menu-buttons.opened .close {
      display: none;
    }
  }

</style>
