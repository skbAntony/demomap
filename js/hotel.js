$(function() {
    Vue.component('my-component', {
        template: '<div><p>test</p></div>',
    });
    // 一般接收api資料
    // let request = new XMLHttpRequest();
    // console.log(request);
    // request.open("get", "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", true);
    // request.setRequestHeader("Accept", "application/json");
    // request.setRequestHeader("Authorization", "Bearer i7FGYV0NJeyPIgd5KuTh1JEEzG1Hwk6xp3LLhUNxVX2sLqVH60D72VxJv2hs");
    // request.send();
    // request.onload = function() {
    //     console.log(request.status);
    //     if (request.status == 200) {
    //         roomsdata = JSON.parse(request.response);
    //         console.log(roomsdata);
    //     }
    // }
    var map = new Vue({
        el: '#vue',
        data: {
            headers: {
                authorization:'Bearer i7FGYV0NJeyPIgd5KuTh1JEEzG1Hwk6xp3LLhUNxVX2sLqVH60D72VxJv2hs',
                accept:'application/json',
            },
            api_data: {},
            scrollPause: false,
            error: false,
            loading: false,
            url: null,
            isShow: true,
            isLabel: false,
            loading: true,

            room: {},
            descriptionShort_text: [],
            descriptionShort: [],
            amenities_img: [],
            imageUrl: {},
        },
        props: {},
        watch: {
            error: function() {
                alert('Data source error');
            },
            loading: function() {
                
            }
        },
        computed: {},
        template: '',
        components: {
            
        },
        methods: {
            getRoom: function(data, id) {
                if (id === undefined) {
                    return axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',data);
                } else {
                    return axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,data);
                }
            },
            more_mouseover: function(){
                this.scrollPause = true;
            },
            more_mouseout: function(){               
                this.scrollPause = false;
            },
            more_click: function(id) {
                this.isShow = false;
                this.isLabel = true;
                var that = this;
                document.querySelector('.slideMenu').style.cssText = 'transform: translateX(calc(-100%)); background-color: #8c9a65; display: none;';
                document.querySelector('.room').style.cssText = 'padding-left: 0px';
                
                this.getRoom({headers:this.headers}, id).then(function(resp){
                    that.room = resp.data.room[0];
                    that.descriptionShort.push(that.room.descriptionShort.GuestMin + ' ~ ' + that.room.descriptionShort.GuestMax);
                    that.descriptionShort.push(that.room.descriptionShort.Bed[0] + ' bed');
                    that.descriptionShort.push(that.room.name);
                    that.descriptionShort.push(that.room.descriptionShort.Footage);
                    that.descriptionShort.push(that.room.normalDayPrice);
                    that.descriptionShort.push(that.room.holidayPrice);
                    that.descriptionShort_text.push('Accommodated:');
                    that.descriptionShort_text.push('Bathroom:');
                    that.descriptionShort_text.push('Bed type:');
                    that.descriptionShort_text.push('Room size:');
                    that.descriptionShort_text.push('Weekday Rate:');
                    that.descriptionShort_text.push('Weekend Rate:');
                    that.amenities_img['Wi-Fi'] = 'wifi';
                    that.amenities_img['Breakfast'] = 'coffee';
                    that.amenities_img['Air-Conditioner'] = 'building';
                    that.amenities_img['Child-Friendly'] = 'child';
                    that.amenities_img['Great-View'] = 'envelope';
                    that.amenities_img['Mini-Bar'] = 'glass';
                    that.amenities_img['Pet-Friendly'] = 'smile-o';
                    that.amenities_img['Refrigerator'] = 'asterisk';
                    that.amenities_img['Room-Service'] = 'user';
                    that.amenities_img['Smoke-Free'] = 'minus';
                    that.amenities_img['Sofa'] = 'tree';
                    that.amenities_img['Television'] = 'television';
                }).catch(function(err){
                    that.error = true;
                });  
            },
            page_click: function() {
                if (this.isShow === false) {
                    this.amenities_img = [];
                    this.descriptionShort = [];
                    this.descriptionShort_text = [];
                    this.isShow = true;
                    this.isLabel = false;
                    document.querySelector('.slideMenu').style.cssText = 'transform: translateX(0%);background-color: #fff; display: block';
                    document.querySelector('.room').style.cssText = 'padding-left: var(--asideleft)';
                }
            },
        },

        mounted: function() {
            this.url = window.location.pathname;
            var that = this;
            this.getRoom({headers:this.headers}).then(function(resp){
                that.api_data = resp.data.items;
                setTimeout(function(){
                    that.loading = false;
                },1500);
            }).catch(function(err){
                that.error = true;
            });  
            var myCarousel = document.querySelector('#carouselExampleSlidesOnly')
            var carousel = new bootstrap.Carousel(myCarousel, {
              interval: 3000,
              wrap: true,
            })
        },
    
    });
});