<template lang="html">
    <div>
        <vs-table :data="posts">
            <template slot="header">
                <h3>Posts</h3>
            </template>
            <template slot="thead">
                <vs-th></vs-th>
            </template>
        </vs-table>
    </div>
</template>

<script>
    export default {
        name: 'App',
      data:()=>({posts})
    };
</script>

<style lang="stylus">
    .con-expand-users
        .con-btns-user
            display flex
            padding 10px
            padding-bottom 0px
            align-items center
            justify-content space-between

            .con-userx
                display flex
                align-items center
                justify-content flex-start

        .list-icon
            i
                font-size .9rem !important
</style>
