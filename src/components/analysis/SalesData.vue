<template>
  <div style="">
    <a-radio-group>
      <a-radio-button value="a">
        全渠道
      </a-radio-button>
      <a-radio-button value="b">
        线上
      </a-radio-button>
      <a-radio-button value="c">
        门店
      </a-radio-button>
    </a-radio-group>
    <v-chart
      :force-fit="true"
      :height="height"
      :data="data"
      :scale="scale"
    >
      <v-tooltip
        :show-title="false"
        data-key="item*percent"
      />
      <v-axis />
      <v-legend
        data-key="item"
        position="right"
        :offset-x="-140"
      />
      <v-pie
        position="percent"
        color="item"
        :v-style="pieStyle"
        :label="labelConfig"
      />
      <v-coord
        type="theta"
        :radius="0.75"
        :inner-radius="0.6"
      />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');

const sourceData = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 },
];

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
});
const data = dv.rows;
export default {
  name: 'SalesData',
  data () {
    return {
      data,
      scale,
      height: 356,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        },
      }],
    };
  },
};
</script>

<style scoped>

</style>
