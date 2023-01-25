<template>
  <div class="accordion" id="paymentAccordion">
    <div
      v-for="data in payments"
      :key="data.id"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="data.id">
        <button
          class="accordion-button collapsed"
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
        class="accordion-collapse collapse"
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
            @click="
              pickPayment(
                item.id,
                item.namaPembayaran,
                item.url_img,
                data
              )
            "
          >
            <div class="img">
              <img :src="item.url_img" alt="" />
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
import axios from '../../../utils/masjedapi';
import _ from 'lodash';

export default {
  name: 'payment',
  data() {
    return {
      activeId: '',
      payments: [
        {
          id: 'QRIS',
          child: 'collapseQRIS',
          title: 'Scan QRIS',
          items: [],
        },
        {
          id: 'EMONEY',
          child: 'collapseEMONEY',
          title: 'E-Money',
          items: [],
        },
        {
          id: 'VA',
          child: 'collapseVA',
          title: 'Transfer Bank Virtual',
          items: [],
        },
        {
          id: 'SETORTUNAI',
          child: 'collapseSETORTUNAI',
          title: 'Setor Tunai',
          items: [],
        },
        // {
        //   id: 'CREDIT',
        //   child: 'collapseSETORTUNAI',
        //   title: 'Kartu Kredit',
        //   items: [],
        // },
      ],
    };
  },
  mounted() {
    this.getPaymentData();
  },
  methods: {
    ...mapActions('transactions', ['setPayment']),
    pickPayment(id, title, img_url, data) {
      this.activeId = id;
      const payload = {
        paymentId: id,
        paymentTitle: title.trim(),
        paymentImage: img_url,
        paymentGroup: data.key,
      };

      this.$emit('setPaymentPilihan', payload);
    },
    async getPaymentData() {
      const payment = await axios.get('/trxmsjd/pembayaran');
      const { data } = payment.data;

      var grouped = _.groupBy(data, function(row) {
        return row.jenisBayar;
      });

      let head = [];
      Object.keys(grouped).forEach((key) => {
        const paymentKey = ['QRIS', 'EMONEY', 'VA', 'SETORTUNAI'];
        if (paymentKey.includes(key)) {
          let temp = {
            id: this.orderMethod(key),
            child: `collapse${this.orderMethod(key)}`,
            title: this.textMethod(key),
            key: key,
            items: [],
          };

          grouped[key].forEach((value) => {
            temp.items.push(value);
          });

          head.push(temp);
        }
        // Do something else
      });

      this.payments = _.orderBy(head, (item) => item.id, ['asc']);
    },
    orderMethod(index) {
      let methods = {
        QRIS: 1,
        EMONEY: 2,
        VA: 3,
        SETORTUNAI: 4,
        // CREDIT: 5,
      };

      return methods[index];
    },
    textMethod(index) {
      let methods = {
        QRIS: 'Scan QRIS',
        EMONEY: 'E-Money',
        VA: 'Transfer Bank Virtual',
        SETORTUNAI: 'Setor Tunai',
        CREDIT: 'Kartu Kredit',
      };

      return methods[index];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
