<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="register-svg left">
          <img src="~assets/img/profile/register.svg" alt="">
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~assets/img/profile/arrow.svg" alt="" class="arrow-svg">
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .register-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  .register-svg img{
    margin-left: 6px;
    width: 50px;
    height: 50px;
  }
  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
    margin-left: 150px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone img{
    position: absolute;
    width: 14px;
    height: 20px;
    left: -15px;
    top: -3px;
  }
</style>
