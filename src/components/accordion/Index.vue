<template>
  <div class="accordion" id="paymentAccordion">
    <div v-for="data in payments" :key="data.id" class="accordion-item">
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
          <div class="box-accordion">
            <div v-html="data.body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'payment',
  data() {
    return {
      activeId: '',
      payments: [],
    };
  },
  mounted() {
    let i = 0;
    this.data.forEach((element) => {
      let temp = {
        id: `head${i}`,
        child: `collapseCaraBayar${i}`,
        title: element.title,
        body: element.desc,
      };
      this.payments.push(temp);
      i++;
    });
  },
  methods: {
    pickPayment(id) {
      this.activeId = id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../payment/scss/index.scss';
</style>
