<template>
    <div class="switch-btn-wrapper cursor-pointer px-1 relative overflow-hidden" :style="wrapperStyle">
        <!--滑块-->
        <div class="slide-block w-[20px] h-[20px] absolute left-0 top-0 " :style="slideBlockStyle">
            <i class="light w-full h-full  absolute left-0 top-0 flex items-center justify-center opacity-1"
                :style="{ opacity: status === onValue ? 1 : 0 }">
                <svg-icon icon-name="sunshine" />
            </i>
            <i class="dark w-full h-full absolute lef-0 top-0 flex items-center justify-center opacity-0"
                :style="{ opacity: status === offValue ? 1 : 0 }">
                <svg-icon icon-name="night" color=" #86909c"/>
            </i>
        </div>
    </div>
</template>
  
<script >

export default {
    name: 'DarkSwitch',
    props: {
        // 状态
        status: {
            type: String,
            required: true
        },
        // 开启时的值
        onValue: {
            type: String,
            required: true
        },
        // 关闭时的值
        offValue: {
            type: String,
            required: true
        },
        // 关闭时背景色
        offBackground: {
            type: String,
            default: '#293140'
        },
        // 开启时背景色
        onBackground: {
            type: String,
            // default: '#2f2f2f'
            default: '#f1f1f1'
        },
        // 关闭时图标背景
        offIconBackground: {
            type: String,
            default: '#1a1a1a'
        },
        // 开启时图标背景
        onIconBackground: {
            type: String,
            default: '#FFF'
        },

    },
    computed: {
        // 滑块样式
        slideBlockStyle() {
            return {
                backgroundColor: this.status === this.onValue ? this.onIconBackground : this.offIconBackground,
                // opacity: props.status === props.onValue ? 0 : 1,
                left: this.status === this.offValue ? 'calc(100% - 20px)' : '0',
            }
        },
        // wrapper样式
        wrapperStyle() {
            return {
                backgroundColor: this.status === this.onValue ? this.onBackground : this.offBackground,
                border: this.status === this.offValue ? '1px solid  #8e8e8e' : '1px solid  rgba(60, 60, 60, .29)',
            }
        }
    }
}
</script>
  
<style scoped lang="scss">
.switch-btn-wrapper {
    width: 50px;
    height: 22px;
    border-radius: 20px;
    //border: 1px solid rgba(60, 60, 60, .29);

    //&.dark {
    //  //border-color: #8e8e8e;
    //  border-color: #86909c;
    //
    //  background-color: #2f2f2f;
    //
    //  .slide-block {
    //    left: calc(100% - 20px);
    //
    //    i:first-child {
    //      opacity: 0;
    //    }
    //
    //    i:last-child {
    //      opacity: 1;
    //      background-color: #1a1a1a;
    //    }
    //  }
    //}

    .slide-block {
        //background: transparent;
        transition: all .3s;
        border-radius: 50%;

        i {
            transition: all .3s;
            background: transparent;
            //background-color: transparent;

            .i-icon {
                transition: all .3s;
                color: #86909c;
            }

            //&:first-child {
            //  background-color: #FFF;
            //  opacity: 1;
            //}
            //
            //&:last-child {
            //  background-color: white;
            //  opacity: 0;
            //}

        }

    }
}
</style>
  