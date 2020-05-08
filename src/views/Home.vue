<template>
  <div class='home'>
    <audio
      id='ig-audio'
      title='Listen to the trailer'
      src='../assets/audio/ig_promo.mp3'
    />
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
.episode,
.episode-first {
  display: grid;
  align-items: center;
  grid-template-columns: 50px auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.episode {
  border-top: #2d32af solid 1px;
}
.player > svg {
  font-size: 32px;
}
.player > svg:hover {
  cursor: pointer;
}
.season-title {
  color: red;
  width: 100%;
  border-bottom: solid red;
  margin-bottom: 0;
}
.episode-title {
  color: #2d32af;
  font-size: 1.3rem;
  margin-bottom: 0;
  margin-top: 0;
}
.episode-title > svg {
  color: red;
}
.ep-description {
  color: #2d32af;
  margin-top: 5px;
  margin-bottom: 5px;
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
  main {
    display: block;
    text-align: center;
    padding: 20px 5% 30px 5%;
  }
  #episodes {
    width: 100%;
    margin-top: 20px;
  }
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
  #episodes {
    width: 100%;
  }
  #ig-content-rank {
    display: none;
  }
  .player > svg {
    font-size: 32px;
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
  #episodes {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 2%;
  }
  /* width */
  #episodes::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  #episodes::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
  }
  /* Handle */
  #episodes::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 30px;
  }
  .episode:hover,
  .episode-first:hover {
    background: #f1f1f1;
  }
  #ig-content-rank {
    display: none;
  }
}
</style>
