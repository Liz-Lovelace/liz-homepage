<script>
  export let website;
  export let link;
  export let handle;
  export let icon;
  export let description;
</script>

<a class="social-button" href={link}>
  <img src="social-icons/{icon}" alt="{website} icon" />
  <div class="social-button-text">
    <h3><span class="website">{website} //</span> {description}</h3>
    <p class="handle">{handle}</p>
  </div>
</a>

<style>
  .social-button {
    padding: 12px 0px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    background-color: rgba(20, 0, 20, 0.5);
    border: 1px solid purple;
    text-decoration: none;
    color: white;
    transition: 0.6s;
  }

  .social-button:hover {
    transition: 0.3s;
    border: 1px solid cyan;
    text-decoration: none;
  }

  .social-button img {
    width: 40px;
    height: 40px;
    margin-left: 15px;
    margin-right: 17px;
    filter: brightness(0) invert(1);
  }

  .social-button-text {
    display: flex;
    flex-direction: column;
  }

  .social-button-text h3 {
    margin: 0;
  }

  .website {
    color: #ff69b4;
  }

  .handle {
    color: #00ffff;
    margin-left: 10px;
    padding-top: 5px;
  }

  .social-button-text p {
    margin: 0;
    margin-left: 10px;
    font-size: 1.4em;
  }
</style>
