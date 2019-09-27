<template>
  <div class="wrapper" ref="aaa">
    <!--1、无论是否设置click：false，button都可以点击-->
    <button @click = "btnClick">按钮</button>

    <!--2、必须设置click：true,那么div才能监听点击-->
    <div @click="btnClick">divdivdiv</div>

    <ul class="content">
      <button @click = "btnClick">按钮</button>
      <li>我是标签li1</li>
      <li>我是标签li2</li>
      <li>我是标签li3</li>
      <li>我是标签li4</li>
      <li>我是标签li5</li>
      <li>我是标签li6</li>
      <li>我是标签li7</li>
      <li>我是标签li8</li>
      <li>我是标签li9</li>
      <li>我是标签li10</li>
      <li>我是标签li11</li>
      <li>我是标签li12</li>
      <li>我是标签li13</li>
      <li>我是标签li14</li>
      <li>我是标签li15</li>
      <li>我是标签li16</li>
      <li>我是标签li17</li>
      <li>我是标签li18</li>
      <li>我是标签li19</li>
      <li>我是标签li20</li>
      <li>我是标签li21</li>
      <li>我是标签li22</li>
      <li>我是标签li23</li>
      <li>我是标签li24</li>
      <li>我是标签li25</li>
      <li>我是标签li26</li>
      <li>我是标签li27</li>
      <li>我是标签li28</li>
      <li>我是标签li29</li>
      <li>我是标签li30</li>
      <li>我是标签li31</li>
      <li>我是标签li32</li>
      <li>我是标签li33</li>
      <li>我是标签li34</li>
      <li>我是标签li35</li>
      <li>我是标签li36</li>
      <li>我是标签li37</li>
      <li>我是标签li38</li>
      <li>我是标签li39</li>
      <li>我是标签li40</li>
      <li>我是标签li41</li>
      <li>我是标签li42</li>
      <li>我是标签li43</li>
      <li>我是标签li44</li>
      <li>我是标签li45</li>
      <li>我是标签li46</li>
      <li>我是标签li47</li>
      <li>我是标签li48</li>
      <li>我是标签li49</li>
      <li>我是标签li50</li>
      <li>我是标签li51</li>
      <li>我是标签li52</li>
      <li>我是标签li53</li>
      <li>我是标签li54</li>
      <li>我是标签li55</li>
      <li>我是标签li56</li>
      <li>我是标签li57</li>
      <li>我是标签li58</li>
      <li>我是标签li59</li>
      <li>我是标签li60</li>
      <li>我是标签li61</li>
      <li>我是标签li62</li>
      <li>我是标签li63</li>
      <li>我是标签li64</li>
      <li>我是标签li65</li>
      <li>我是标签li66</li>
      <li>我是标签li67</li>
      <li>我是标签li68</li>
      <li>我是标签li69</li>
      <li>我是标签li70</li>
      <li>我是标签li71</li>
      <li>我是标签li72</li>
      <li>我是标签li73</li>
      <li>我是标签li74</li>
      <li>我是标签li75</li>
      <li>我是标签li76</li>
      <li>我是标签li77</li>
      <li>我是标签li78</li>
      <li>我是标签li79</li>
      <li>我是标签li80</li>
      <li>我是标签li81</li>
      <li>我是标签li82</li>
      <li>我是标签li83</li>
      <li>我是标签li84</li>
      <li>我是标签li85</li>
      <li>我是标签li86</li>
      <li>我是标签li87</li>
      <li>我是标签li88</li>
      <li>我是标签li89</li>
      <li>我是标签li90</li>
      <li>我是标签li91</li>
      <li>我是标签li92</li>
      <li>我是标签li93</li>
      <li>我是标签li94</li>
      <li>我是标签li95</li>
      <li>我是标签li96</li>
      <li>我是标签li97</li>
      <li>我是标签li98</li>
      <li>我是标签li99</li>
      <li>我是标签li100</li>
    </ul>
  </div>
</template>

<script>
  import BSroll from 'better-scroll'

  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    methods:{
      btnClick(){
        console.log('点击了');
      }
    },
    //created是组件创建完成之后调用
    created() {
      /*console.log(this.$refs.aaa);
      console.log(document.querySelector('.wrapper'));

      this.scroll = new BSroll(bull/undefined,{
      })*/
    },
    mounted(){  //这里的时候组件才能挂在上，获取document.querySelector('.wrapper')
      /*console.log(this.$refs.aaa);
      console.log(document.querySelector('.wrapper'));*/

      this.scroll = new BSroll(document.querySelector('.wrapper'),{
        probeType:3,//监听滚动的position
        click:true,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp',() => {
        console.log('上啦加载更多')
        //发送网络请求，请求更多页的数据

        //等数据请求完成，并且新的数据展示出来后调用下面这个函数
        setTimeout(() => {
          this.bscroll.finishPullUp();
        })
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
