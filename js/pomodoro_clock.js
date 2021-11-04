window.onload = function(){
    var app = new Vue({
        el: '#app',
        data: {
            input_placeholder: 'add to_do_list',
            add: false,
            addtext: '',
            addtext_num: 0,
            list_to_do: [],
        },
        watch: {

        },
        mounted: function() {
            
        },
        methods: {
            add_text: function() {
                console.log(this.addtext);
                this.list_to_do.push(this.addtext);
                this.addtext = '';
                this.addtext_num++;
            },
        },
        computed: {

        },
    });
    $(".inputtext").keydown(function (e) {
        if (e.which == 13) {
            app.add_text();
        }
    });
};