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
          <template v-if="loading">
            <skeleton
              :theme="'opacity'"
              :shape="'radius'"
              :bg-color="'#dcdbdc'"
            >
              <tb-skeleton
                :width="`100%`"
                :aspect-ratio="0.1"
              ></tb-skeleton>
              <sized-box :height="5" />
            </skeleton>
          </template>
          <template v-else>
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
                  item.img_url,
                  data
                )
              "
            >
              <div class="img">
                <img
                  v-if="!imageError"
                  :src="item.img_url"
                  alt=""
                  @error="onLoadError"
                  @load="onLoad"
                />
                <div
                  v-else
                  style="display: block; width: 50px; height: 50px; background: #333"
                ></div>
              </div>
              <div class="text">
                {{ item.namaPembayaran || '' }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/utils/api';
import _ from 'lodash';

export default {
  name: 'payment',
  data() {
    return {
      activeId: '',
      loading: false,
      imageError: false,
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
      this.loading = true;
      const payment = await api.get('/getpembayaran');

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
      this.loading = false;
    },
    orderMethod(index) {
      let methods = {
        QRIS: 1,
        EMONEY: 2,
        VA: 3,
        SETORTUNAI: 4,
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
    onLoadError() {
      this.imageError = true;
    },
    onLoad() {
      this.imageError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
