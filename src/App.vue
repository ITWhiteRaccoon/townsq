<template lang="html">
    <div id="app">
        <mu-container>
            <mu-paper :z-depth="1">
                <mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="posts">
                    <template slot="expand" slot-scope="prop">
                        <div><div></div></div>
                    </template>
                </mu-data-table>
            </mu-paper>
        </mu-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [
                    {
                        "userId": 1,
                        "id": 1,
                        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                    },
                    {
                        "userId": 1,
                        "id": 2,
                        "title": "qui est esse",
                        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                    }
                ]
            }
        }
    };
</script>

<style>
</style>
