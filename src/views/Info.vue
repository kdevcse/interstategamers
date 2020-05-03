<template>
  <div class='info'>
    <article>
      <h1>About Us:</h1>
      <div id='boyz'>
        <div id='boyz-img'>
          <img src='../assets/images/TheBoyz.jpg' />
          <figcaption>From left: Peter, Kevin and Chris (ZLink)</figcaption>
        </div>
        <div id='boyz-description'>
          <p>
            On a serendipitous autumn day in 2015, Kevin “KSlugs” Lewis and Peter “deal_4_real” Williams met on Twitch during one of Kevin’s Pokémon streams.
            The pair became fast friends thanks to a shared love of speedrunning and Smash Bros., and continued to grow their friendship over the years on the general foundation of video games.
          </p>
          <p>
            Well after crossing the threshold from Twitch buddies to Actual Friends™, Kevin and Peter realized that one of their favorite pastimes was to analyze and debate the merits of various games.
            Peter designed the now-familiar rating system for his own sake, but Kevin realized the potential to record their thoughts and share them with the world in an organized (and hopefully entertaining) way.
            Thus the Interstate Gamers podcast was born in the winter of 2018, so named because of Kevin’s residence in Texas and Peter’s residence in Colorado.
          </p>
          <p>
            The boys aim not only to inform and entertain listeners, but also to increase their own sensitivity to game design.
            They continue to study new games alongside old favorites to better understand the medium that has played such an enormous role in their lives.
            They also continue to whisper sweet nothings to each other during recording sessions, but Peter isn’t terribly consistent about editing them out.
          </p>
        </div>
      </div>
      <InfoContactList heading='My heading' v-bind:items='whereToListenList'></InfoContactList>
    </article>
  </div>
</template>
<script>
// @ is an alias to /src
import InfoContactList from '../components/InfoContactList'

export default {
  name: 'Info',
  components: {
    InfoContactList
  },
  data: function () {
    return {
      whereToListenList: [
        {
          href:
            'https://podcasts.apple.com/us/podcast/the-interstate-gamers/id133250306',
          title: 'Apple Podcasts'
        },
        {
          href:
            'https://play.google.com/music/listen?u=0#/ps/I52grgkf57z7gdp6zqwewo3smlq',
          title: 'Google Play'
        },
        {
          href: 'https://open.spotify.com/show/3WiDNf7oaBADnLGycQzYuu',
          title: 'Spotify'
        },
        {
          href: 'https://www.stitcher.com/podcast/the-interstate-gamers',
          title: 'Stitcher'
        },
        {
          href:
            'https://www.iheart.com/podcast/269-the-interstate-gamers-29827163/',
          title: 'iHeart Radio'
        },
        {
          href:
            'https://www.youtube.com/channel/UCIg62C1mDZq6rOsDxZlye1A/featured',
          title: 'YouTube'
        },
        {
          href: 'https://feeds.simplecast.com/naeWXDEF',
          title: 'RSS'
        }
      ]
    }
  }
}
</script>

<style>
article {
  padding: 15px 5% 75px 5%;
}
h1 {
  color: #2d32af;
  border-bottom: 2px #2d32af solid;
}
.contact-list {
  color: #2d32af;
}
.contact-list > li {
  padding: 0.5vw;
}
.contact-list-item,
.contact-list-no-link {
  text-decoration: none;
  color: #2d32af;
}
.contact-list-item:hover {
  color: red;
}
#boyz-img {
  border-radius: 3px;
  text-align: center;
}
#boyz-img img {
  width: 100%;
}
#boyz-img figcaption {
  color: red;
  font-size: 13px;
}
@media only screen and (max-width: 600px) {
  #boyz-img {
    width: 100%;
  }
}
@media only screen and (min-width: 600px) {
  #boyz {
    display: inline-block;
  }
  #boyz-img {
    float: left;
    width: 312px;
    margin-right: 30px;
  }
  #boyz-description {
    max-width: 1250px;
  }
  #boyz-description > p {
    margin-top: 0;
    font-size: 1.2rem;
  }
  .contact-list-item,
  .contact-list-no-link {
    font-size: 125%;
  }
  h1 {
    font-size: 150%;
  }
}
@media only screen and (min-width: 992px) {
}
</style>
