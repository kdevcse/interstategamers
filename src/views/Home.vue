<template>
  <div class='home'>
    <IgHeader></IgHeader>
    <IgContent></IgContent>
  </div>
</template>

<script>
import IgHeader from '../components/IgHeader'
import IgContent from '../components/IgContent'

export default {
  name: 'Home',
  components: {
    IgHeader,
    IgContent
  }
}
</script>

<style>
.ig-content {
  display: grid;
}
.season-title {
  color: red;
  width: 100%;
  border-bottom: solid red;
  margin-bottom: 0;
}
#ig-content-rank {
  margin-left: 5%;
  height: 100%;
  color: #2d32af;
  display: none;
}
#ig-content-rank-game-title {
  margin-bottom: 0;
}
#ig-content-rank-game-rank {
  font-size: 17px;
  margin-top: 5px;
}
.rank-header {
  margin-top: 10px;
  margin-bottom: 10px;
}
#ig-content-rank-game-overall {
  color: red;
}
.progress-background {
  background-color: #f1f1f1;
  width: 100%;
  border-radius: 4px;
}
.progress-foreground {
  height: 33px;
  background-color: #2d32af;
  border-radius: 4px;
}
#ig-content-rank-progress-overall {
  background-color: red;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  #ig-content-rank {
    display: none;
  }
  .ig-content {
    padding-left: 5%;
    padding-right: 5%;
    grid-template-columns: 100%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 768px) {
  #ig-content-rank {
    display: none;
  }
  .ig-content {
    padding: 50px 5%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .ig-content {
    grid-template-columns: 50% 50%;
    grid-template-rows: 90vh;
  }
  #ig-content-rank {
    display: none;
  }
}
</style>
