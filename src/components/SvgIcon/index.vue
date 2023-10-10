<template>
    <svg :class="[svgClass,'align-middle']"
         aria-hidden="true"
         :width="`${$props.size}px`"
         :height="`${$props.size}px`"
         
         style="display: inline-block;overflow: hidden">
        <use :xlink:href="iconId" style="fill: currentColor;width: 100%;height: 100%"/>
    </svg>
</template>
<script>
/* style="fill: currentColor;display: inline-block;overflow: hidden">*/
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            require: true
        },
        size: {
            type: Number,
            default: 16
        }
    },
    computed: {
        // 返回图标名字，#icon-iconName，例如#icon-shop
        iconId() {
            return `#icon-${this.iconName}`
        },
        // svg所有的class类名
        svgClass() {
            return `svg-icon ${this.iconName}`
        }
    }
}
</script>
<style>
</style>
