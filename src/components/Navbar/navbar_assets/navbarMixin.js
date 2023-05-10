// navbarMixin.js
export default {
    data() {
      return {
        bgColor: '#fff'
      }
    },
    computed: {
      navbarBgColor() {
        return this.bgColor;
      },
      navbarTextColor() {
        const brightness = this.calculateBrightness(this.bgColor);
        return brightness < 128 ? '#fff' : '#000';
      }
    },
    methods: {
      calculateBrightness(color) {
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
      }
    },
    watch: {
      '$route'(to) {
        // 获取当前页面的背景颜色，并更新背景色变量
        const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
        this.bgColor = bgColor;
      }
    },
    mounted() {
      // 获取当前页面的背景颜色，并初始化背景色变量
      const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
      this.bgColor = bgColor;
    }
  }
  