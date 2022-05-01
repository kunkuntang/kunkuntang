<nav class="nav-list" id="navList">
  <ul class="nav-con">
    <a href="https://kunkuntang.github.io">
      <li class="nav-item">个人博客</li>
    </a>
    <a href="https://github.com/kunkuntang">
      <li class="nav-item">开源项目</li>
    </a>
    <a href="https://lenkuntang.cn/personalResume.pdf">
      <li class="nav-item">个人简历</li>
    </a>
  </ul>
</nav>

<style>
  ul,
  li {
    border: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .nav-list {
    width: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  }
  .nav-list .nav-con {
    max-width: 970px;
    margin: 0 auto;
  }
  .nav-list .nav-con .nav-item {
    width: 8em;
    height: 45px;
    float: left;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 45px;
  }

</style>
