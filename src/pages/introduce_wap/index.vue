<template>
  <div class="introduce-wap">
    <div class="introduce-wap-header">
        <img src="@/assets/wap/bg_wap.png" alt="" />
        <div class="introduce-wap-header-con">
            <div class="introduce-wap-header-logo">
                <img src="@/assets/wap/logo_wap.png" alt="" />
            </div>
            <h1>倍思全流程教学管理云平台</h1>
            <p>中小学全流程教育教学云平台</p>
            <p>为新高考提供一站式整体解决方案</p>
        </div>
        <!-- <img src="@/assets/wap/erweima_wap_wx.png" class="erweima-wap" alt="" v-if="isWeixin" />
        <img src="@/assets/wap/erweima_wap_net.png" class="erweima-wap" alt="" v-else /> -->
        <div class="erweima-wap-con">
          <img :src="qrcodeImg" alt="">
          <!-- <img src="@/assets/wap/only_erweima_wap.png" alt=""> -->
          <p v-if="isWeixin">长按识别二维码进入小程序</p>
          <p v-else>请保存上方小程序码图片，在微信扫一扫中打开，或在微信中搜索小程序“倍思教育科技”。</p>
        </div>
    </div>
    <ul class="introduce-wap-con">
        <li>
            <img src="@/assets/school_manage.png" alt="" />
            <h2>学校过程管理大师</h2>
            <p>赋能过程管理，提高教学质量</p>
        </li>
        <li>
            <img src="@/assets/role.png" alt="" />
            <h2>角色化工作界面易学好用</h2>
            <p>角色化与场景化的工作界面，提高管理效率</p>
        </li>
        <li>
            <img src="@/assets/big_data.png" alt="" />
            <h2>教育大数据和AI智能 </h2>
            <p>积累教育大数据，人工智能助力学校教学管理</p>
        </li>
        <li>
            <img src="@/assets/platform.png" alt="" />
            <h2>开放的SAAS平台</h2>
            <p>安全性高，学校使用放心，不用再增加硬件投</p>
        </li>
    </ul>
    <p class="introduce-wap-line"></p>
    <div class="introduce-wap-button">
        <div class="introduce-wap-button-con clear">
            <span @click="toNet">www.51basejy.com</span>
        </div>
    </div>
    <div class="introduce-wap-footer">Copyright ©深圳市倍思教育科技有限公司   备案号：粤ICP备18074306号-2 </div>
</div>
</template>
<script>
import qrcodeMixin from '../introduce_pc/qrcodeMixin'

export default {
  name: 'introduce_wap',
  mixins: [qrcodeMixin],
  data() {
    return {
      isWeixin: false, // 是否在微信中打开
    }
  },
  created() {
    // 判断是微信打开还是浏览器打开
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeixin = true
    } else {
        this.isWeixin = false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.reqQrcode()
    })
  },
  // 配置移动端页面meta
  metaInfo() {
    return {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        }
      ]
    }
  },
  methods: {
    // 跳转到官网
    toNet() {
      window.open('https://www.51basejy.com/')
    },
  }
}
</script>
<style lang="less" scoped>
html{
  line-height: initial;
}
body{
  font-size: 0.32rem;
}
.introduce-wap {
  width: 100%;
  max-width: 750px;
  min-width: 320px;
  margin: 0 auto;
  .introduce-wap-header {
    position: relative;
    margin-bottom: 2.6rem;
    > img {
      display: block;
      width: 100%;
    }
    .introduce-wap-header-con {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      .introduce-wap-header-logo {
        height: .72rem;
        padding-top: .18rem;
        padding-left: .2rem;
        margin-bottom: .27rem;
        box-sizing: border-box;
        border-bottom: 1px solid #6F6F6F;
        img {
          display: block;
          height: .42rem;
        }
      }
      h1 {
        margin-bottom: .18rem;
        font-size: .36rem;
        font-weight: bold;
      }
      p {
        font-size: .22rem;
        margin-bottom: .06rem;
      }
      h1, p {
        color: white;
        text-align: center;
      }
    }
    .erweima-wap {
      position: absolute;
      overflow: hidden;
      top: 2.59rem;
      left: 0;
      right: 0;
      width: 5.3rem;
      margin: 0 auto;
      box-shadow: 0 0 10px 0 rgba(128, 128, 128, .4);
      border-radius: .03rem;
      background: white;
    }
    .erweima-wap-con {
      position: absolute;
      overflow: hidden;
      top: 2.59rem;
      left: 0;
      right: 0;
      width: 5.3rem;
      padding: .32rem .3rem .31rem;
      margin: 0 auto;
      box-shadow: 0 0 10px 0 rgba(128, 128, 128, .4);
      border-radius: .03rem;
      background: white;
      img {
        display: block;
        width: 2.2rem;
        margin: 0 auto .2rem;
      }
      p {
        font-size: .24rem;
        color: #9B9B9B;
        text-align: center;
      }
    }
  }
  .introduce-wap-con {
    li {
      margin-bottom: .6rem;
      img {
        display: block;
        width: .82rem;
        margin: 0 auto;
      }
      h2 {
        margin-top: .22rem;
        margin-bottom: .16rem;
        text-align: center;
        font-size: .3rem;
      }
      p {
        font-size: .22rem;
        color: #999;
        text-align: center;
      }
    }
  }
  .introduce-wap-line {
    width: 81%;
    margin: 0 auto .3rem;
    border-bottom: 1px solid #ccc;
  }
  .introduce-wap-button-con {
    padding-bottom: .3rem;
    margin: 0 auto;
    span {
      display: block;
      width: 33%;
      height: .34rem;
      margin: 0 auto;
      padding-left: .54rem;
      text-align: center;
      background: url('~@/assets/wap/guanwang.png') left center no-repeat;
      background-size: contain;
      line-height: .34rem;
      font-size: .26rem;
      color: #22B5C0;
    }
  }
  .introduce-wap-footer {
    width: 100%;
    height: .6rem;
    background: #1B858E;
    font-size: .12rem;
    color: #ccc;
    text-align: center;
    line-height: .6rem;
  }
}
</style>


