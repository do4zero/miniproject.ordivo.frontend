import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSkeletonLoader from 'skeleton-loader-vue';
import SizedBox from './components/SizedBox.vue';
import Select2 from 'v-select2-component';
import DatePicker from 'vue2-datepicker';

import $ from 'jquery';
import 'jquery/src/jquery.js';
import 'popper.js/dist/popper.min.js';
import 'vue2-datepicker/index.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faSort,
  faCrosshairs,
  faHome,
  faList,
  faChevronCircleRight,
  faShoppingCart,
  faCartPlus,
  faSearch,
  faShoppingBag,
  faListAlt,
  faQuestion,
  faBook,
  faPlus,
  faMinus,
  faShoppingBasket,
  faTrash,
  faScroll,
  faUser,
  faEdit,
  faMapMarker,
  faMapMarkerAlt,
  faDollarSign,
  faNotesMedical,
  faPaperPlane,
  faShareAlt,
  faWindowClose,
  faHistory,
  faSubway,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vuelidate from 'vuelidate';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueClipboard from 'vue-clipboard2';
import VueSweetalert2 from 'vue-sweetalert2';
import skeleton from 'tb-skeleton';
import 'tb-skeleton/dist/skeleton.css';

import Toasted from 'vue-toasted';

import store from './stores/index.js';
import VueCountdown from '@chenfengyuan/vue-countdown';

library.add(faUserSecret);
library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faFilter);
library.add(faSort);
library.add(faCrosshairs);
library.add(faHome);
library.add(faList);
library.add(faChevronCircleRight);
library.add(faShoppingCart);
library.add(faSearch);
library.add(faShoppingBag);
library.add(faListAlt);
library.add(faQuestion);
library.add(faBook);
library.add(faCartPlus);
library.add(faMinus);
library.add(faPlus);
library.add(faShoppingBasket);
library.add(faTrash);
library.add(faScroll);
library.add(faUser);
library.add(faEdit);
library.add(faMapMarker);
library.add(faMapMarkerAlt);
library.add(faDollarSign);
library.add(faNotesMedical);
library.add(faPaperPlane);
library.add(faShareAlt);
library.add(faWindowClose);
library.add(faHistory);
library.add(faSubway);

// Register the component globally
Vue.component('sized-box', SizedBox);
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('DatePicker', DatePicker);
Vue.component('Select2', Select2);
Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
Vue.use(VueClipboard);
Vue.use(Toasted);
Vue.use(VueSweetalert2);
Vue.use(skeleton);

Vue.filter('rupiah', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/,/g, '.');
});

Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);

import onlyInt from 'vue-input-only-number';

Vue.use(onlyInt);
// VModal
import VModal from 'vue-js-modal/dist/index.nocss.js';
import 'vue-js-modal/dist/styles.css';
Vue.use(VModal, {
  dynamicDefaults: {
    height: 'auto',
    classes: 'myclass',
  },
});

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps';
import lib from 'qrcode';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDd-Xv_wBoM5_oaEwAuDpIy_nTRCkKX2EI',
    libraries: 'places',
  },
});

Vue.mixin({
  methods: {
    rp(amount, decimalCount = 2, decimal = ',', thousands = '.') {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(
            decimalCount
          ))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        );
      } catch (e) {
        return 0;
      }
    },
    capitalize(s) {
      return s.toLowerCase().replace(/\b./g, function(a) {
        return a.toUpperCase();
      });
    },
    // Take an image URL, downscale it to the given width, and return a new image URL.
    downscaleImage(dataUrl, newWidth, imageType, imageArguments) {
      'use strict';
      var image,
        oldWidth,
        oldHeight,
        newHeight,
        canvas,
        ctx,
        newDataUrl;

      // Provide default values
      imageType = imageType || 'image/jpeg';
      imageArguments = imageArguments || 0.7;

      // Create a temporary image so that we can compute the height of the downscaled image.
      image = new Image();
      image.src = dataUrl;
      oldWidth = image.width;
      oldHeight = image.height;
      newHeight = Math.floor((oldHeight / oldWidth) * newWidth);

      // Create a temporary canvas to draw the downscaled image on.
      canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw the downscaled image on the canvas and return the new data URL.
      ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      newDataUrl = canvas.toDataURL(imageType, imageArguments);
      return newDataUrl;
    },
    diffDays(target) {
      const d1 = new Date(); // 2000-01-01
      const d2 = new Date(target);

      let ndays;
      let tv1 = d1.valueOf(); // msec since 1970
      let tv2 = d2.valueOf();

      ndays = (tv2 - tv1) / 1000 / 86400;
      ndays = Math.round(ndays - 0.5);
      return ndays;
    },
    calculateTotal(items) {
      const priceTotal = items.reduce(function(acc, obj) {
        return acc + obj.subtotal;
      }, 0);

      const qtyTotal = items.reduce(function(acc, obj) {
        return acc + obj.qty;
      }, 0);

      return {
        priceTotal,
        qtyTotal,
      };
    },
    // Add Chart
    processChart(item, items, operator = 'plus', qtyParams = 1) {
      let currentitems = items;
      const index = currentitems.findIndex((x) => x.id === item.id);
      const harga_jual = parseInt(item.harga_jual);
      const qty =
        index !== -1
          ? operator === 'plus'
            ? currentitems[index].qty + qtyParams
            : currentitems[index].qty - qtyParams
          : 1;
      const subtotal = harga_jual * qty;

      if (index !== -1) {
        currentitems[index].qty = qty;
        currentitems[index].subtotal = subtotal;
        return currentitems;
      }

      item.qty = qty;
      item.subtotal = subtotal;

      return [...currentitems, item];
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

$(window).scroll(function() {
  if ($(this).scrollTop() > 300) {
    $('.topbar').addClass('shrink');
  } else {
    $('.topbar').removeClass('shrink');
  }
});
