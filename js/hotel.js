$(function() {
    var map = new Vue({
        el: '#vue',
        data: {
            
        },
    
        methods: {
            getRoom:function(data, id){
                if (id === undefined) {
                    return axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',data);
                } else {
                    return axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,data);
                }
            },
        },
    
        mounted: function() {
            var headers = {
                authorization:'Bearer i7FGYV0NJeyPIgd5KuTh1JEEzG1Hwk6xp3LLhUNxVX2sLqVH60D72VxJv2hs',
                accept:'application/json'
            };    
            this.getRoom({headers:headers}, '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu').then(function(resp){
                console.log(resp.data);
            }).catch(function(err){
                console.log(err);
            });  
            this.$emit('update:open', true);  
        },
    
    });
});
