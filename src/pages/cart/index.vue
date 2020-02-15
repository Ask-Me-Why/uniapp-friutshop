<template>
    <BaseLayout>
        <view>{{title}}</view>
    </BaseLayout>
</template>
<script>
import BaseLayout from '@core/base-layout';
export default {
    data() {
        return {
            title: 'cart'
        };
    },
    components: {
        BaseLayout
    },
    onLoad() {

    },
    methods: {

    }
};

</script>
<style>
.content {
    text-align: center;
    height: 400upx;
}

.logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
}

.title {
    font-size: 36upx;
    color: #8f8f94;
}

</style>
