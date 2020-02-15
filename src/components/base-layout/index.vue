<template>
    <view class="wrapper">
        <view class="base-body">
            <slot></slot>
        </view>
        <MenuBar></MenuBar>
    </view>
</template>
<script>
import MenuBar from './menu-bar.vue';
export default {
    name: 'BaseLayout',
    components: {
        MenuBar
    }
};

</script>
<style lang="scss">
uni-page-body {
    width: 100%;
    height: 100%;
}

.wrapper {
    width: 100%;
    height: 100%;
}

.base-body {
    height: calc(100% - 100rpx);

    &::after {
        content: '';
        display: block;
        height: 100rpx;
    }
}

</style>
