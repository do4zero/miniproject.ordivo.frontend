<template>
  <div class="accordion" id="paymentAccordion">
    <div v-for="data in payments" :key="data.id" class="accordion-item">
      <h2 class="accordion-header" :id="data.id">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${data.child}`"
          aria-expanded="false"
          :aria-controls="`${data.child}`"
        >
          {{ data.title }}
        </button>
      </h2>
      <div
        :id="data.child"
        class="accordion-collapse"
        :aria-labelledby="data.id"
        data-bs-parent="#paymentAccordion"
      >
        <div class="accordion-body">
          <div
            :key="item.id"
            v-for="item in data.items"
            class="box-payment"
            :class="{ 'is-active': activeId === item.id }"
            ref="payment"
            @click="pickPayment(item.id, item.namaPembayaran, item.img_url)"
          >
            <div class="img">
              <img :src="item.img_url" alt="" />
            </div>
            <div class="text">
              {{ item.namaPembayaran || '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from '../../utils/api';
import _ from 'lodash';

export default {
  name: 'payment',
  data() {
    return {
      activeId: '',
      payments: [
        {
          id: 'EMONEY',
          child: 'collapseEMONEY',
          title: 'E-Money',
          items: [],
        },
      ],
    };
  },
  computed: {
    ...mapState('transactions', ['paymentId']),
  },
  mounted() {
    if (this.paymentId !== '' || typeof this.paymentId !== 'undefined') {
      this.activeId = this.paymentId;
    }
    this.getPaymentData();
  },
  methods: {
    ...mapActions('transactions', ['setPayment']),
    pickPayment(id, title, img_url) {
      this.activeId = id;
      const payload = {
        paymentId: id,
        paymentTitle: title.trim(),
        paymentImage: img_url,
      };
      this.setPayment(payload);
    },
    async getPaymentData() {
      const payment = await axios.get('/getpembayaran');
      const { data } = payment.data;

      var grouped = _.groupBy(data, function(row) {
        return row.jenisBayar;
      });

      let head = [];
      Object.keys(grouped).forEach((key) => {
        let temp = {
          id: this.orderMethod(key),
          child: `collapse${this.orderMethod(key)}`,
          title: this.textMethod(key),
          items: [],
        };

        grouped[key].forEach((value, index) => {
          if (this.textMethod(key) === 'E-Money') {
            if (value.kodeBayar === 'APPLINKAJAMSJD') {
              temp.items.push(value);
            }
          }
        });

        if (this.textMethod(key) === 'E-Money') {
          head.push(temp);
        }
        // Do something else
      });

      this.payments = _.orderBy(head, (item) => item.id, ['asc']);
    },
    orderMethod(index) {
      let methods = {
        EMONEY: 1,
        QRIS: 2,
        VA: 3,
        SETORTUNAI: 4,
      };

      return methods[index];
    },
    textMethod(index) {
      let methods = {
        EMONEY: 'E-Money',
        QRIS: 'QRIS',
        VA: 'Transfer Bank Virtual',
        SETORTUNAI: 'Setor Tunai',
      };

      return methods[index];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'scss/index.scss';
</style>
