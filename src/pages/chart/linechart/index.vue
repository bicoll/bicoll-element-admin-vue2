<template>
    <div class="linechart-wrapper">
        <h1>折线图</h1>
    </div>
</template>
<script>
export default {
    name: 'linechart',
    destroyed(){
        console.log('销毁');
    },
    deactivated(){
        console.log('缓存');
    }
}
</script>
