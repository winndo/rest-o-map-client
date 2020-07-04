<template id="main-page">
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center">Cosmo-Demo</div>
        </v-ons-toolbar>

        <v-ons-list-title>Find Restaurant</v-ons-list-title>
        <v-ons-list>
            <v-ons-list-item>
                <v-ons-input placeholder="City" float v-model.trim="city"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-input placeholder="Restaurant Name" float v-model.trim="restaurantName"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-button
                    modifier="large"
                    :disabled="disableSearchButton"
                    @click="handleFindRestaurant"
                >Find Restaurant</v-ons-button>
            </v-ons-list-item>
            <v-ons-list-item v-if="restaurants.length > 0">
                <img class="custom-img-map" :src="mapUrl">
            </v-ons-list-item>

            <v-ons-carousel
                v-if="restaurants.length > 0"
                swipeable
                auto-scroll
                item-width="80%"
                overscrollable
                :index.sync="carouselIndex"
            >
                <v-ons-carousel-item

                    v-for="(restaurant, index) in restaurants"
                    :key="index">   
                    <div class="custom-carousel-item" :class="index === carouselIndex ? 'active' : ''">
                        <h3>{{restaurant.name}}</h3>
                        <p>{{restaurant.formatted_address}}</p>
                        <p>{{ restaurant.peopleRequestCount }} other people have requested</p>
                    </div>
                </v-ons-carousel-item>
            </v-ons-carousel>

            <div :style="dots" v-if="restaurants.length > 0">
                <span
                    :index="dotIndex - 1"
                    v-for="dotIndex in Object.keys(restaurants).length"
                    :key="dotIndex"
                    style="cursor: pointer"
                    @click="carouselIndex = dotIndex - 1"
                >{{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}</span>
            </div>

            <v-ons-list-header></v-ons-list-header>
        </v-ons-list>
        <v-ons-list modifier="inset">
            <v-ons-list-header>Message</v-ons-list-header>
            <v-ons-list-item>
                <textarea
                    class="custom-textarea"
                    placeholder="Tell them how amazing it would be if they were on Cosmo! Be as specific as possible!"
                    name="message"
                    id
                    cols="30"
                    rows="6"
                ></textarea>
            </v-ons-list-item>
        </v-ons-list>

        <p class="custom-p">We will forward your message directly to the restaurant.</p>

        <v-ons-modal :visible="loading" @click="loading = false">
            <p style="text-align: center">
                Loading
                <v-ons-icon icon="fa-circle-o-notch" spin></v-ons-icon>
            </p>
        </v-ons-modal>
    </v-ons-page>
</template>

<script>
import axios from "axios";

export default {
    name: "App",
    data() {
        return {
            city: "Los Angeles",
            restaurantName: "Jack's Chicken",
            loading: false,
            url: "https://rest-o.herokuapp.com/",
            restaurants: [],
            carouselIndex: 0,
            dots: {
                display: 'none',
                textAlign: 'center',
                fontSize: '30px',
                color: '#fff',
                position: 'absolute',
                bottom: '40px',
                left: 0,
                right: 0
            },
            maps_api: '',
            baseMapUrl: 'https://maps.googleapis.com/maps/api/staticmap?',
            zoomLevel: 16,
        };
    },
    mounted() {
        // this.$ons.notification.alert('Welcome to Cosmo Demo App!')
        this.maps_api = process.env.VUE_APP_MAPS_KEY;
    },
    computed: {
        disableSearchButton() {
            return this.city == "" && this.city.length < 2;
        },
        currentLat() {
            return this.restaurants[this.carouselIndex].geometry.location.lat;
        },
        currentLon() {
            return this.restaurants[this.carouselIndex].geometry.location.lng;
        },
        mapUrl() {
            const centered = this.currentLat + ',' + this.currentLon;
            return `${this.baseMapUrl}center=${centered}&zoom=${this.zoomLevel}&size=600x300&maptype=roadmap&markers=color:purple%7Clabel:S%7C${centered}&key=${this.maps_api}`;
        }
    },
    methods: {
        replaceWithPlus(string) {
            return string.split(' ').join('+');
        },
        randomPeopleCount() {
            return Math.floor(Math.random() * (30 - 1 + 1) + 1);
        },
        handleFindRestaurant() {
            this.loading = true;
            axios
                .get(`${this.url}search/${this.restaurantName}+${this.city}`)
                .then(response => {
                    console.log("success", response);
                    this.restaurants = response.data.results;
                    this.restaurants.map(restaurant => {
                        restaurant.peopleRequestCount = this.randomPeopleCount();
                    });
                })
                .catch(err => {
                    console.log("error", err);
                })
                .finally(res => {
                    console.log("finally", res);
                    this.loading = !this.loading;
                });
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
    color: #666666;
}
.custom-p {
    padding: 16px;
    position: relative;
    bottom: 0;
}
.custom-carousel-item {
    margin: 1rem 0 1rem 1rem;
    padding: 0 1rem;
    border: 4px solid #e8e8e8;
    border-radius: 1rem;
    min-height: 160px;
    transition: border-color 250ms ease-in;
    p:nth-child(2) {
        opacity: .5;
    }
    p:nth-child(3) {
        color: #341799;
        font-weight: bold;
    }
    &.active {
        border-color: #341799;
    }
}
.custom-img-map {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
}
</style>
