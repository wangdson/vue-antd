<template>
  <div>
    <div
      :class="['mask', openDrawer ? 'open' : 'close']"
      @click="close"
    />
    <div :class="['drawer', placement, openDrawer ? 'open' : 'close']">
      <div
        ref="drawer"
        style="position: relative; height: 100%;"
      >
        <slot />
      </div>
      <div
        v-if="showHandler"
        ref="handler"
        :class="['handler-container', placement]"
        @click="handle"
      >
        <slot
          v-if="$slots.handler"
          name="handler"
        />
        <div
          v-else
          class="handler"
        >
          <a-icon :type="openDrawer ? 'close' : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    openDrawer: {
      type: Boolean,
      required: false,
      default: false,
    },
    placement: {
      type: String,
      required: false,
      default: 'left',
    },
    showHandler: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      drawerWidth: 0,
    };
  },
  watch: {
    drawerWidth: function (val) {
      if (this.placement === 'left') {
        this.$refs.handler.style.left = val + 'px';
      } else {
        this.$refs.handler.style.right = val + 'px';
      }
    },
  },
  mounted () {
    this.drawerWidth = this.getDrawerWidth();
  },
  methods: {
    open () {
      this.$emit('change', true);
    },
    close () {
      this.$emit('change', false);
    },
    handle () {
      this.$emit('change', !this.openDrawer);
    },
    getDrawerWidth () {
      return this.$refs.drawer.clientWidth;
    },
  },
};
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    z-index: 100;
    &.open{
      display: inline-block;
    }
    &.close{
      display: none;
    }
  }
  .drawer{
    position: fixed;
    height: 100%;
    transition: all 0.5s;
    z-index: 100;
    &.left{
      left: 0px;
      &.open{
        box-shadow: 2px 0 8px rgba(0,0,0,.15);
      }
      &.close{
        transform: translateX(-100%);
      }
    }
    &.right{
      right: 0px;
      &.open{
        box-shadow: -2px 0 8px rgba(0,0,0,.15);
      }
      &.close{
        transform: translateX(100%);
      }
    }
    .sider{
      height: 100%;
    }
  }
  .handler-container{
    position: fixed;
    top: 200px;
    text-align: center;
    transition: all 0.5s;
    cursor: pointer;
    .handler {
      height: 40px;
      width: 40px;
      background-color: #fff;
      z-index: 100;
      font-size: 26px;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      line-height: 40px;
    }
    &.left{
      .handler{
        border-radius: 0 5px 5px 0;
      }
    }
    &.right{
      .handler{
        border-radius: 5px 0 0 5px;
      }
    }
  }
</style>
