<script>
  import BlogLayout from "../BlogLayout.svelte";
</script>

<BlogLayout>
  <h1>Robust Trust</h1>

  <fieldset class="example">
    <legend> Example 1</legend>
    <p>
      Until age 18, I lived in Russia. I invested through the central government
      bank. I paid income tax. I was a good citizen. And then Russia attacked
      Ukraine and tried to draft me into the war. My investments disappeared
      overnight due to sanctions. I felt betrayed by my country.
    </p>

    <p>There are 3 ways to update your strategy after this:</p>
    <fieldset class="update-1">
      <legend> Option 1: Stop trusting </legend>
      <p>
        Move to a shack in the woods. Stop paying taxes. Generate your own
        electricity. The <strong>cost</strong> is that you can't trade your specialized
        skills for mass produced goods and services.
      </p>
    </fieldset>

    <fieldset class="update-2">
      <legend> Option 2: Don't update your strategy </legend>
      <p>
        Keep being a quiet little citizen of your country. Don't criticize the
        government online, try not to think about your family and friends in
        Ukraine getting bombed. Sometimes the government will take away your
        rights, but what are you gonna do - leave?
      </p>
    </fieldset>

    <fieldset class="update-3">
      <legend> Option 3: Become <strong>Robust</strong> </legend>
      <p>
        Leave. Go to Kazakhstan. Store money in dollar bills. Be prepared to
        move cities or countries. Don't buy more stuff than you can bring with
        you. Be prepared for the government to suddenly start hunting you.
      </p>
    </fieldset>
  </fieldset>

  <fieldset class="example">
    <legend> Example 2 </legend>
    <p>
      When I was 17, I only had one friend. Extremely good friend. One day he
      found a girlfriend, and suddenly stopped paying attention to me. I fell
      into depression. I was betrayed.
    </p>

    <p>There are 3 ways to update your strategy after this:</p>

    <fieldset class="update-1">
      <legend> Option 1: Stop trusting </legend>
      <p>
        No relationships - no problem! The <strong>cost</strong> is that you are
        now incapable of long-term collaboration, intimacy, or sincere friendship.
        But you won't get hurt!
      </p>
    </fieldset>
    <fieldset class="update-2">
      <legend> Option 2: Don't update your strategy </legend>
      <p>
        Forget the betrayal. You're yearning to get back what you had, so find
        another friend, and trust them with all your heart again. Enjoy yourself
        until you get abandoned again.
      </p>
    </fieldset>
    <fieldset class="update-3">
      <legend> Option 3: Become <strong>Robust</strong> </legend>
      <p>
        Have fallback relationships. Rely on multiple people from separate
        groups. Have both remote and local friends. Be prepared for sudden
        hostility from anyone. Learn to quickly build a network around yourself.
      </p>
    </fieldset>
  </fieldset>

  <p>Google promises you unlimited storage. They will take it away.</p>
  <p>Your lover promises you comfort. They will take it away.</p>
  <p>Your country promises you democracy. They will take it away.</p>

  <p>
    <span class="text-update-1"> If you trust no one</span>, you'll miss a lot
    of opportunities.
  </p>
  <p>
    <span class="text-update-2">
      If you put all your trust into something
    </span>, you'll be a victim.
  </p>
  <p>
    If you want to be free, <span class="text-update-3"
      >be strategic about your trust</span
    >.
  </p>
</BlogLayout>

<style>
  fieldset {
    margin-bottom: 20px;
  }

  .update-1 p,
  .update-2 p,
  .update-3 p {
    margin: 6px 0;
  }

  .example {
    border: 1px solid var(--grey-bc);
  }

  .update-1 {
    border: 1px solid var(--red-bc);
  }
  .update-2 {
    border: 1px solid var(--green-bc);
  }
  .update-3 {
    border: 1px solid var(--blue-bc);
  }

  .text-update-1 {
    border-bottom: 1px solid var(--red-bc);
    padding-bottom: 1px;
  }
  .text-update-2 {
    border-bottom: 1px solid var(--green-bc);
    padding-bottom: 1px;
  }
  .text-update-3 {
    border-bottom: 1px solid var(--blue-bc);
    padding-bottom: 1px;
  }
</style>
