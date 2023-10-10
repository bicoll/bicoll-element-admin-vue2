<template>
    <div class=".filter-wrapper">
        <el-row type="flex" class="row-bg">
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name: 'TableFilter',

}
</script>