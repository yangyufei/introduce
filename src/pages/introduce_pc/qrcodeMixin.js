// 动态二维码转化
export default {
  data() {
    return {
			qrcodeImg: '',
    }
  },
  mounted() {
    // this.reqQrcode()
  },
  methods: {
		reqQrcode() {
			let params = {
        // userId: this.$store.state.userId.userId,
        type: 'EDUYUN',
        // userName: this.$store.state.userId.userName,
        userId: 'test_teacheraf74b11e6a293286ed48',
        // userName: '测试教师-勿删',
        // gender: 1,
        // hasBind: true,
			}
      this.$ajax.getBuffer('/extra/user/getUserPic', params).then(res => {
				function transformArrayBufferToBase64 (buffer) {
						var binary = '';
						var bytes = new Uint8Array(buffer);
						for (var len = bytes.byteLength, i = 0; i < len; i++) {
								binary += String.fromCharCode(bytes[i]);
						}
						return window.btoa(binary);
				}
				let dataStr =  transformArrayBufferToBase64(res)
				this.qrcodeImg = "data:image/png;base64," + dataStr;
      })
		},
  },
}