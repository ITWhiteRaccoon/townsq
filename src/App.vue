<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TownSq</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-data-table v-if="dataReady" :loading="!dataReady" loading-text="Nothing here :(" class="elevation-1"
                          :headers="headers" :items-per-page="15"
                          :items="posts">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Posts</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" persistent max-width="600px">
                            <v-card>
                                <v-card-title>
                                    <span>Post #{{currentPostId}}</span>
                                </v-card-title>
                                <v-divider class="my-2"></v-divider>
                                <v-card-text>
                                    <v-container class="body-1 text--secondary">
                                        <v-row>
                                            <v-col>
                                                <font-awesome-icon class="title text--primary"
                                                                   icon="user"></font-awesome-icon>
                                                {{editedItem.name}}
                                            </v-col>
                                            <v-col>
                                                <font-awesome-icon class="title text--primary"
                                                                   icon="at"></font-awesome-icon>
                                                {{editedItem.username}}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <font-awesome-icon class="title text--primary"
                                                                   icon="envelope"></font-awesome-icon>
                                                {{editedItem.email}}
                                            </v-col>
                                            <v-col>
                                                <font-awesome-icon class="title text--primary"
                                                                   icon="phone"></font-awesome-icon>
                                                {{editedItem.phone}}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <font-awesome-icon class="title text--primary"
                                                                   icon="map-marked"></font-awesome-icon>
                                                {{editedItem.address.suite}} {{editedItem.address.street}},
                                                {{editedItem.address.city}} {{editedItem.address.zipcode}}
                                            </v-col>
                                        </v-row>
                                        <v-divider class="my-8"></v-divider>
                                        <v-row>
                                            <v-col>
                                                <v-text-field label="Title" v-model="editedItem.title"
                                                              outlined></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-textarea label="Content" v-model="editedItem.body"
                                                            outlined></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="closeEditDialog">Cancel</v-btn>
                                    <v-btn text @click="saveEdit">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.userId="{item}">
                    {{getUserData[item.userId,'username']}}
                </template>
                <template v-slot:item.edit="{item}">
                    <font-awesome-icon icon="edit" @click.stop="openEditDialog(item)"></font-awesome-icon>
                </template>
            </v-data-table>
            <v-snackbar v-model="notification">{{text}}
                <v-btn text @click="notification=false"></v-btn>
            </v-snackbar>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios';

    require('typeface-open-sans');

    export default {
        name: 'App',
        data() {
            return {
                dataReady: false,
                notification: false,
                notificationTimeout: 2000,
                dialog: false,
                headers: [
                    {text: 'ID', align: 'center', value: 'id'},
                    {text: 'Created By', align: 'center', value: 'userId'},
                    {text: 'Title', align: 'center', value: 'title'},
                    {text: 'Edit Post', align: 'center', value: 'edit'}
                ],
                posts: [],
                users: {},
                currentPostId: -1,
                editedIndex: -1,
                editedItem: {
                    id: '',
                    userId: '',
                    title: '',
                    body: '',
                    name: '',
                    username: '',
                    email: '',
                    phone: '',
                    website: '',
                    address: {
                        street: '',
                        suite: '',
                        city: '',
                        zipcode: ''
                    }
                },
                defaultItem: {
                    id: '',
                    userId: '',
                    title: '',
                    body: '',
                    name: '',
                    username: '',
                    email: '',
                    phone: '',
                    website: '',
                    address: {
                        street: '',
                        suite: '',
                        city: '',
                        zipcode: ''
                    }
                }
            };
        },
        methods: {
            openEditDialog(item) {
                this.currentPostId = item.id;
                this.editedIndex = this.posts.indexOf(item);
                this.editedItem = Object.assign({}, item, this.users[item.id]);
                this.dialog = true;
            },
            closeEditDialog() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300);
            },
            saveEdit() {
                if (this.editedIndex > -1) {
                    Object.assign(this.posts[this.editedIndex], this.editedItem);
                } else {
                    this.showNotification('Nothing to save!');
                }
                this.closeEditDialog();
            },
            showNotification(text, timeout) {
                if (!timeout) {
                    timeout = 2000;
                }
                this.notification = true;
                this.notificationTimeout = timeout;
            },
            getUserData(userId, prop) {
                if (this.users) {
                    return this.users[userId][prop];
                } else {
                    return '';
                }
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
                    for (let i = 0; i < responseUsers.data.length; i++) {
                        this.users[responseUsers.data[i].id] = responseUsers.data[i];
                    }
                    this.posts = responsePosts.data;
                    this.dataReady = true;
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