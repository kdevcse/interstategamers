<template>
  <div class="info">
    <article>
      <h1>About Us:</h1>
      <div id="boyz">
        <div id="boyz-img">
          <img :src="theBoyz">
          <figcaption>From left: Peter, Kevin and Chris (ZLink)</figcaption>
        </div>
        <div id="boyz-description">
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
      <info-contact-list
        heading="Where to Listen:"
        :items="INFO_LINKS.whereToListenList"
      />
      <info-contact-list
        heading="How to Support Us:"
        :items="INFO_LINKS.howToSupportUsList"
      />
      <info-contact-list
        heading="Social Media:"
        :items="INFO_LINKS.socialMediaList"
      />
      <info-contact-list
        heading="Business Inquiries:"
        :items="INFO_LINKS.businessInquiriesList"
      />
      <info-contact-list
        heading="Website Issues:"
        :items="INFO_LINKS.websiteIssuesList"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
import InfoContactList from "@/components/InfoContactList.vue";
import INFO_LINKS from "@/globals/info-links";
import theBoyz from "@/assets/images/the_boyz.jpg";
</script>

<style scoped>

article {
  padding: 15px 5% 75px 5%;
}
h1 {
  color: var(--primary-color);
  border-bottom: 2px var(--primary-color) solid;
}
#boyz-img {
  border-radius: 3px;
  text-align: center;
}
#boyz-img img {
  width: 100%;
}
#boyz-img figcaption {
  color: var(--accent-color);
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
  h1 {
    font-size: 150%;
  }
}
@media screen and (prefers-color-scheme: dark) {
  h1 {
    color: var(--default-text-color);
  }
}
</style>
