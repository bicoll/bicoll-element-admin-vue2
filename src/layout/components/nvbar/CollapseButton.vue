<template>
    <div :class="[{collapse},'collapse-button-wrapper']">
        <span class="line" :style="[{backgroundColor:lineColor}]"></span>
        <span class="line" :style="[{backgroundColor:lineColor}]"></span>
        <span class="line" :style="[{backgroundColor:lineColor}]"></span>
    </div>
</template>

<script>
export default {
    name: 'CollapseButton',// 折叠按钮
    props: {
        // 是否折叠
        collapse: {
            type: Boolean,
            default: true
        },
        // 线条颜色
        lineColor: {
            type: String,
            default: '#272e3b'
        }
    }
}
</script>

<style scoped lang="scss">
.collapse-button-wrapper {
  display: inline-block;
  width: 26px;
  margin-right: 20px;
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover .line:first-child,
  &:hover .line:last-child {
    width: 100%;
  }

  .line {
    display: block;
    height: 3px;
    margin-left: auto;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    transition: all .3s ease-in-out;


    &:first-child {
      width: 10px;
    }

    &:nth-child(2) {
      margin: 4px 0;
    }

    &:last-child {
      width: 22px;
    }

  }

  //折叠状态：变成箭头
  &.collapse {
    .line:first-child {
      width: 12px;
      transform: translateY(3px) translateX(0px) rotate(40deg);
    }

    .line:last-child {
      width: 12px;
      transform: translateY(-3px) translateX(0px) rotate(-40deg);
    }

    .line:nth-child(2) {
      width: 90%;
      transform: translateX(10%);
    }
  }
}
</style>
