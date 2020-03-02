<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TownSq</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-data-table @click:row="openEditDialog" class="elevation-1" :headers="headers" :items-per-page="15"
                          :items="posts">
                <template v-slot:item.userId="{item}">
                    {{getUserData(item.userId).username}}
                </template>
                <v-dialog v-model="dialog" persistent>
                    <v-card>
                        <v-card-title>
                            Edit post #{{editingPostId}}
                        </v-card-title>
                        <v-card-text>
                            <v-form v-model="validEdit">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field label="Title" outlined></v-text-field>
                                            <v-textarea label="Content" outlined></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-data-table>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios';

    require('typeface-open-sans');

    let posts = [];
    let users = {};

    export default {
        name: 'App',
        data() {
            return {
                dialog: false,
                validEdit: false,
                editingPostId: null,
                headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Created By', align: 'center', value: 'userId'},
                    {text: 'Title', align: 'center', value: 'title'}
                ],
                posts: posts
            };
        },
        methods: {
            openEditDialog(row) {
                this.dialog = true;
                console.log(row);
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
                axios.get('http://jsonplaceholder.typicode.com/posts', {validateStatus: this.validateStatus}),
                axios.get('http://jsonplaceholder.typicode.com/users', {validateStatus: this.validateStatus})
            ])
                .then(axios.spread((responsePosts, responseUsers) => {
                    this.posts = responsePosts.data;
                    for (let i = 0; i < responseUsers.data.length; i++) {
                        users[responseUsers.data[i].id] = responseUsers.data[i];
                    }
                    this.loading = false;
                }))
                .catch(this.axiosError);
        }
    };
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