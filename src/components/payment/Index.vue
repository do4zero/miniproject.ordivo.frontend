<template>
  <div class="accordion" id="paymentAccordion">
    <div
      v-for="data in payments"
      :key="data.id"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="data.id">
        <button
          class="accordion-button"
          type="button"
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
              :class="{
                'is-active': activeId === item.id_pembayaran,
              }"
              ref="payment"
              @click="
                pickPayment(
                  item.id_pembayaran,
                  item.nama_pembayaran,
                  item.url_img,
                  item.type_admin,
                  item.admin,
                  data
                )
              "
            >
              <div class="img">
                <img :src="`/img/metpem/${item.url_img}`" />
              </div>
              <div class="text">
                {{ item.nama_pembayaran || '' }}
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
import pos from '@/utils/pos';
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
    pickPayment(id, title, img_url, type, admin, data) {
      this.activeId = id;
      const payload = {
        paymentId: id,
        paymentTitle: title.trim(),
        paymentImage: img_url,
        paymentGroup: data.key,
        paymentType: type,
        paymentAdmin: parseInt(admin),
      };

      this.$emit('setPaymentPilihan', payload);
    },
    async getPaymentData() {
      this.loading = true;
      const payment = await pos.get('/micro/metpem');

      const { data } = payment.data;

      var grouped = _.groupBy(data, function(row) {
        return row.type;
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
