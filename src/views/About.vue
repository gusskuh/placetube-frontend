<template>
  <div class="about-page-container">
    <div class="about-item-header">
      <img class="about-item-header-info-pic" src="https://d33wubrfki0l68.cloudfront.net/1967c0923ec2039f845c917dae55fa32f0b73e74/ca447/img/festify-logo.svg">
    <h1>Get your Party started with Jukebox</h1>
      <p>Jukebox is a free app that lets your guests choose which music should be played using their smartphones.</p>
    </div>
    <div class="about-item-body">
      <div class="about-item-body-info">
        <img class="about-item-body-info-pic" src="https://d33wubrfki0l68.cloudfront.net/eb9833fbdb6d88f097587990fed9b5c134155169/d530a/img/steps/step2.jpg">
        <p>You create a new playlist and share it with your guests</p>
      </div>
      <div class="about-item-body-info">
        <img class="about-item-body-info-pic" src="https://d33wubrfki0l68.cloudfront.net/eb9833fbdb6d88f097587990fed9b5c134155169/d530a/img/steps/step2.jpg">
        <p>Your guests join the playlist in their mobile browser</p>
      </div>
      <div class="about-item-body-info">
        <img class="about-item-body-info-pic" src="https://d33wubrfki0l68.cloudfront.net/eb9833fbdb6d88f097587990fed9b5c134155169/d530a/img/steps/step2.jpg">
        <p>Everyone votes to decide which tracks should be played</p>
      </div>
    </div>
    <div class="about-item-info">
      <div class="about-item-info-pic img-first">
       </div>
        <!-- <img class="about-item-info-pic" src="https://d33wubrfki0l68.cloudfront.net/9d49a8dfa3dac6d9c4d10794494af5d2741f319e/6d773/img/features/voting.jpg"> -->
          <div class="about-item-details img-first">
        <h1>Social Voting</h1>
        <p>Your guests can choose their favourite song to get played next using their smartphones. 
           Using this system, Jukebox will play the music that your guests like.</p>
      </div>
      </div>
      <div class="about-item-info">
         <div class="about-item-details p-first">
        <h1>Browser Based</h1>
        <p>Jukebox is fully browser-based, so it can be used anywhere a modern web browser can be.
           Playback is supported in Google Chrome and Firefox.</p>
      </div>
        <!-- <img class="about-item-info-pic" src="https://d33wubrfki0l68.cloudfront.net/7fb7619d1c9a63e502c4de1b67dc56ce5327d8a8/ff9cc/img/features/browsers.png" -->
          <!-- > -->
        <div class="about-item-info-pic p-first">
       </div>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about-page-container {
  margin: 0 auto;
  margin-top: 100px;
  max-width: 1200px;
  width: 90%;
  color: black;
}

.about-item-header {
  margin-bottom: 50px;
}
.about-item-body {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;

}

.about-item-info {
  display: flex;
}

.about-item-info-pic {
  height: 200px;
  width: 30%;
}

.about-item-body-info-pic {
  border-radius: 50%;
  height: auto;
  width: 50%;
}

.about-item-header-info-pic {
  border-radius: 50%;
  height: auto;
  width: 30%;
}

.about-item-details {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}

.about-item-details.img-first {
  padding: 30px 0 30px 30px;
}

.about-item-details.p-first {
  padding: 30px 20px 30px 0;
}
div.about-item-info-pic {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  min-width: 200px;
}

.about-item-info-pic.p-first {
  background-image: url('https://d33wubrfki0l68.cloudfront.net/7fb7619d1c9a63e502c4de1b67dc56ce5327d8a8/ff9cc/img/features/browsers.png');
}

.about-item-info-pic.img-first {
  background-image: url('https://d33wubrfki0l68.cloudfront.net/9d49a8dfa3dac6d9c4d10794494af5d2741f319e/6d773/img/features/voting.jpg');
}
</style>

