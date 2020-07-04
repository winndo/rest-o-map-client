<template id="main-page">
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">Cosmo-Demo</div>
        </v-ons-toolbar>

        <v-ons-list-title>Find Restaurant</v-ons-list-title>
        <v-ons-list>
            <v-ons-list-item>
                <v-ons-input placeholder="City" float v-model="city"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-input placeholder="Restaurant Name" float v-model="restaurantName"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-button
                    modifier="large"
                    @click="handleFindRestaurant"
                >Find Restaurant</v-ons-button>
            </v-ons-list-item>
            <v-ons-list-header></v-ons-list-header>

        </v-ons-list>
        <v-ons-list modifier="inset">
        <v-ons-list-header>Message</v-ons-list-header>
        <v-ons-list-item>
            <textarea class="custom-textarea" placeholder="Tell them how amazing it would be if they were on Cosmo! Be as specific as possible!" name="message" id="" cols="30" rows="6"></textarea>
        </v-ons-list-item>
        </v-ons-list>

        <p class="custom-p">We will forward your message directly to the restaurant.</p>

        <v-ons-modal :visible="loading" @click="loading = false">
            <p style="text-align: center">
                Loading
                <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
                <br />
                <br />Click or wait
            </p>
        </v-ons-modal>
    </v-ons-page>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            city: "",
            restaurantName: "",
            loading: false            
        };
    },
    mounted() {
        // this.$ons.notification.alert('Welcome to Cosmo Demo App!')
    },
    methods: {
        handleFindRestaurant() {
            this.loading = true;
        }
    }
};
</script>

<style lang="scss">
    .custom-textarea {
        width: 100%;
        border: 0;
        background-color: #e9e9e9;
        padding: 1rem;
        border-radius: 5px;
    }
    .custom-textarea::placeholder {
        color: #C4C4C4;
    }
    .custom-p {
        padding: 16px;
        position: absolute;
        bottom: 0;
    }
</style>
