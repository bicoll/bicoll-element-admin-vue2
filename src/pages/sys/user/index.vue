<template>
    <div class="user-wrapper" p-4>
        <TableFilter />
        <el-table :data="users" border style="width: 100%;"  height="400">
            <el-table-column prop="id" label="id" width="80">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="160">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="80">
                <template slot-scope="item">
                    <span>{{ item.row.sex ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="80">
                <template slot-scope="item">
                    <span>{{ item.row.status }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="avatar" label="头像" align="center" width="80" >
                <template slot-scope="item">
                    <el-avatar :size="40"  shape="square" :src="item.row.avatar" :fit="'scale-down'" />
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <el-button type="text">详情</el-button>
                <el-button type="text">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import TableFilter from './components/TableFilter.vue'
import { getUsers } from '@/api/sys/user'

export default {
    name: 'user',
    components: {
        TableFilter
    },
    data() {
        return {
            users: []
        }
    },
    created() {
        getUsers().then(resp => {
            console.log(resp);
            this.users = resp
        });
    }
}
</script>
<style>
.user-wrapper {
    background-color: var(--clr-white);
}
</style>
