<template>
    <view class="menu-bar">
        <view class="mb-border"></view>
        <view class="mb-list">
            <view
                class="mb-list__item"
                v-for="(item,$i) in list"
                :key="$i"
                :class="{'active': currentRoute === item.url }"
                @click="navigatorUrl(item)">
                <view class="mb-list__box">
                    <view class="mb-list__icon">
                        <view class="iconfont" :class="item.icon"></view>
                    </view>
                    <view class="mb-list__text">{{item.label}}</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: 'MenuBar',
    data() {
        return {
            list: [{
                label: '首页',
                icon: 'icon-home',
                url: '/'
            }, {
                label: '分类',
                icon: 'icon-category',
                url: '/pages/category/index'
            }, {
                label: '购物车',
                icon: 'icon-cart',
                url: '/pages/cart/index'
            }, {
                label: '我的',
                icon: 'icon-personal',
                url: '/pages/personal/index'
            }],
            currentRoute: ''
        };
    },
    mounted() {
        document.body.appendChild(this.$el);
        this.currentRoute = this.$route.fullPath;
    },
    destroyed() {
        this.$el.remove && this.$el.remove();
    },
    methods: {
        navigatorUrl(item) {
            if (this.currentRoute === item.url) return;
            uni.reLaunch({
                url: item.url
            });
        }
    }
};
</script>
<style lang="scss">
    .menu-bar{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 998;
        background-color: $primary--color-0;
    }
    .mb-border{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 2rpx;
        transform: scaleY(.5);
        background-color: rgba($menu-bar-color,.5);
    }
    .mb-list{
        position: relative;
        @include flexLayout(flex,normal,normal);
        .mb-list__item{
            cursor: pointer;
            flex: 1;
            color: $menu-bar-color;
            height: 100rpx;
            @include flexLayout(flex,center,normal);
            transition: color .3s linear;
            &.active{
                color: $menu-bar-active-color;
            }
        }
        .mb-list__icon{
            margin-top: 10rpx;
            font-size: $menu-bar-font-size+28rpx;
            line-height: 1;
            height: $menu-bar-font-size+28rpx;
            color: inherit;
        }
        .mb-list__text{
            font-size: $menu-bar-font-size;
            color: inherit;
            line-height: 1.8;
        }
    }
</style>
