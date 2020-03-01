<template lang="html">
    <div id="app">
        <mu-container>
            <mu-paper :z-depth="1">
                <mu-data-table no-data-text="Nothing here :(" :columns="columns" :sort.sync="sort"
                               @sort-change="handleSortChange" :data="posts">
                    <template slot="expand" slot-scope="prop">
                        <div>
                            <div>{{prop.row.name}}</div>
                            <div>{{prop.row.username}}</div>
                            <div>{{prop.row.email}}</div>
                            <div>{{prop.row.phone}}</div>
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <td>{{scope.row.userId}}</td>
                        <td>{{scope.row.title}}</td>
                    </template>
                </mu-data-table>
            </mu-paper>
        </mu-container>
    </div>
</template>

<script>
    import axios from 'axios';

    let posts = [];
    let users = [];

    export default {
        data() {
            return {
                sort: {
                    name: '',
                    order: 'asc'
                },
                columns: [
                    {title: 'User ID', name: 'userId', align: 'center', sortable: true},
                    {title: 'Title', name: 'title', align: 'center'}
                ],
                posts: posts,
                users: users
            };
        },
        mounted() {
            axios
                .get('http://jsonplaceholder.typicode.com/posts')
                .then(response => (this.posts = response.data))
                .catch(function (error) {
                    if (error.response) {
                        alert(error.data);
                    } else if (error.request) {
                        alert('No response from server.');
                    } else {
                        alert(error.message);
                    }
                });
        },
        methods: {
            handleSortChange({name, order}) {
                this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
            }

        }
    };
</script>

<style>
</style>
