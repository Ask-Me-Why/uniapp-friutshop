<script>
export default {
    onLaunch: function() {
        console.log('App Launch');
    },
    onShow: function() {
        this.initData();
        console.log('App Show');
    },
    onHide: function() {
        console.log('App Hide');
    },
    methods: {
        async initData(page) {
            try {
                const response = await this.$server.test();
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }
};

</script>
<style src="./static/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
