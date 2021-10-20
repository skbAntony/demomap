$(function() {
    var map = new Vue({
        el: '#vue',
        data: {
            // loading的畫面
            loading: true,
            
            // 地圖
            map: null,
            
            // 所有藥局的資料
            data: [],
            search_data: [],
            
            // 選擇地址的地區
            selected: null,
            areas: [],
            
            // 座標
            lat: 0,
            lng: 0,
            
            // 地標
            usermarker: null,

            // 輸入欄
            search_input: '',

            // 勾選目前還有賣大人小孩的口罩
            checkboxes: [false, false],
        },
    
        methods: {
            geticon: function (type) {
                return L.icon({
                    // iconUrl: `http://localhost/laraveldemo/demo/demomap/images/mark-${type}.png`,
                    // github   
                    iconUrl: `https://skbantony.github.io/demomap/images/mark-${type}.png`,    
                    iconSize: [66, 90],
                    iconAnchor: [33, 90], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -80] // point from which the popup should open relative to the iconAnchor
                });
            },
            openmap: function() {
                // 設定地圖
                this.map = L.map('map', {
                    center: [25.0334772, 121.552944],
                    zoom: 12,
                    maxBounds: L.latLngBounds(L.latLng(28, 115), L.latLng(20, 127)),
                    minZoom: 10,
                    maxZoom: 18,
                    zoomControl: false,
                });
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
                L.control.zoom({
                    position: 'topright'
                }).addTo(this.map);
                // 連續點擊兩下
                this.map.on('dblclick', (e) => {
                    // 取得經緯度
                    this.lat = e.latlng.lat;
                    this.lng = e.latlng.lng;
                    // 把地圖中心移動到點擊位置
                    this.map.setView(new L.LatLng(e.latlng.lat, e.latlng.lng));
                    // 第二次點擊的位置後會先刪除已點擊過的位置
                    if (this.usermarker !== null) {
                        this.map.removeLayer(this.usermarker);
                    }
                    this.usermarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.geticon('blue') });
                    this.map.addLayer(this.usermarker);
                });
                // 手機使用單擊移動使用者位置
                // map.on('click', (e) => {

                // })
            },
            addmarkers: function () {
                // 宣告 marker cluster
                this.storeMarkers = new L.markerClusterGroup().addTo(this.map);
                for (let i = 0; i < this.data.length; i++) {
                    this.data[i].marker = L.marker(
                        [this.data[i].geometry.coordinates[1], this.data[i].geometry.coordinates[0]],
                        { icon: this.geticon('red') });
                    // 監聽 marker 點擊事件
                    let that = this;
                    this.data[i].marker.on('dblclick', (e) => {
                        // 取得經緯度
                        this.lat = e.latlng.lat;
                        this.lng = e.latlng.lng;
                        // 把地圖中心移動到點擊位置
                        this.map.setView(new L.LatLng(e.latlng.lat, e.latlng.lng));
                        // 第二次點擊的位置後會先刪除已點擊過的位置
                        if (this.usermarker !== null) {
                            this.map.removeLayer(this.usermarker);
                        }
                        this.usermarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.geticon('blue') });
                        this.map.addLayer(this.usermarker);
                    });
                    // 放入 marker cluster
                    this.storeMarkers.addLayer(this.data[i].marker);
                }
                // 放入 map
                this.map.addLayer(this.storeMarkers);
            },
            getdata: function () {
                // 撈出所有藥局的資料
                let that = this;
                $.ajax({
                    url: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        that.data = data.features;
                        that.search_data = data.features;
                        data.features.forEach(function(item, i) {
                            if (item.properties.county !== '') {
                                that.areas.push(item.properties.county);
                            }
                        });
                        var result = that.areas.filter((item, index, arr) => {
                            return arr.indexOf(item) === index;
                        });
                        // result.sort();
                        that.areas = result;
                        that.addmarkers();
                        that.loading = false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest, textStatus, errorThrown);
                    }
                });
            },
            search: function() {
                // 搜尋藥局
                var input = this.search_input;
                var test = this.search_data; 
                let that = this;
                that.data = [];
                test.forEach(function(item, i) {
                    // 根據關鍵字找出藥局
                    if ((that.checkboxes[0] === false || (that.checkboxes[0] === true && item.properties.mask_adult > 0)) &&
                        (that.checkboxes[1] === false || (that.checkboxes[1] === true && item.properties.mask_child > 0)) &&
                        item.properties.name.includes(input)) {
                        // 判斷下拉式地區
                        if (that.selected === null || (that.selected !== null && that.selected === item.properties.county)) {
                            that.data.push(item);
                        }
                    }
                    
                });
            },
            list_data: function (list_data) {
                // console.log(list_data.properties.available);
                var lng = list_data.geometry.coordinates[0];
                var lat = list_data.geometry.coordinates[1];
                // 取得經緯度
                this.lat = lat;
                this.lng = lng;
                // 把地圖中心移動到點擊位置
                this.map.setView(new L.LatLng(lat, lng));
                // 第二次點擊的位置後會先刪除已點擊過的位置
                if (this.usermarker !== null) {
                    this.map.removeLayer(this.usermarker);
                }
                this.usermarker = L.marker([lat, lng], { icon: this.geticon('blue') });
                this.map.addLayer(this.usermarker);
            },
        },
    
        mounted: function() {
            this.openmap();
            this.getdata();
        },
    
    });
    $(".search_input").keydown(function (e) {
        if (e.which == 13) {
            map.search();
        }
    });
});
