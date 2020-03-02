<template lang="html">
    <div id="app" class="top-navbar">
        <v-app-bar>
            <v-toolbar-title>TownSq</v-toolbar-title>
        </v-app-bar>
        <main>
            <v-data-table loading loading-text="Nothing here :(" :data="posts">
                <template slot="header">
                    <h3>Posts</h3>
                </template>
                <template slot="thead">
                    <vs-th>ID</vs-th>
                    <vs-th>Created by</vs-th>
                    <vs-th>Title</vs-th>
                </template>
                <template slot-scope="{data}">
                    <vs-tr :key="index" v-for="(post, index) in data">
                        <vs-td>{{data[index].id}}</vs-td>
                        <vs-td>{{getUserData(data[index].userId).username}}</vs-td>
                        <vs-td>{{data[index].title}}</vs-td>
                    </vs-tr>
                </template>
            </v-data-table>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';

    require('typeface-open-sans');

    let posts = [];
    let users = {};

    export default {
        data() {
            return {
                loading: true,
                posts: posts,
                users: users
            };
        },
        methods: {
            openEditDialog() {
                alert('eita');
            },
            getUserData(userId) {
                return users[userId];
            },
            validateStatus(status) {
                return status === '' || status === 304 || (status >= 200 && status < 300);
            },
            axiosError(error) {
                if (error.response) {
                    alert(error.data);
                } else if (error.request) {
                    alert('No response from server.');
                } else {
                    alert(error.message);
                }
            }
        },
        mounted() {
            axios.all([
                axios
                    .get('http://jsonplaceholder.typicode.com/posts', {validateStatus: this.validateStatus}),
                axios
                    .get('http://jsonplaceholder.typicode.com/users', {validateStatus: this.validateStatus})
            ])
                .then(axios.spread((responsePosts, responseUsers) => {
                    this.posts = responsePosts.data;
                    for (let i = 0; i < responseUsers.data.length; i++) {
                        users[responseUsers.data[i].id] = responseUsers.data[i];
                    }
                    this.loading = false;
                }))
                .catch(this.axiosError);
            //.then((responseUsers) => {
            //})
            //.catch(this.axiosError);
        }
    }
    ;
</script>

<style lang="scss">
    html {
        font-family: 'Open Sans';
    }

    .top-navbar {
        .vs-navbar {
            height: 60px;
            position: fixed;
            top: 0;
            width: 100%;
        }

        main {
            inset: 60px 0 0;
            position: relative;
        }
    }
</style>
