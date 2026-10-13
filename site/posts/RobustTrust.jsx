function Option({ n, title, children }) {
  return (
    <fieldset className={`option option-${n}`}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

export default function RobustTrust() {
  return (
    <>
      <fieldset className="example">
        <legend>Example 1</legend>
        <p>
          Until age 18, I lived in Russia. I invested through the central government bank. I paid
          income tax. I was a good citizen. And then Russia attacked Ukraine and tried to draft me into
          the war. My investments disappeared overnight due to sanctions. I felt betrayed by my country.
        </p>
        <p>There are 3 ways to update your strategy after this:</p>
        <Option n={1} title="Option 1: Stop trusting">
          <p>
            Move to a shack in the woods. Stop paying taxes. Generate your own electricity.
            The <strong>cost</strong> is that you can’t trade your specialized skills for mass produced
            goods and services.
          </p>
        </Option>
        <Option n={2} title="Option 2: Don’t update your strategy">
          <p>
            Keep being a quiet little citizen of your country. Don’t criticize the government online, try
            not to think about your family and friends in Ukraine getting bombed. Sometimes the
            government will take away your rights, but what are you gonna do – leave?
          </p>
        </Option>
        <Option n={3} title={<>Option 3: Become <strong>Robust</strong></>}>
          <p>
            Leave. Go to Kazakhstan. Store money in dollar bills. Be prepared to move cities or
            countries. Don’t buy more stuff than you can bring with you. Be prepared for the government
            to suddenly start hunting you.
          </p>
        </Option>
      </fieldset>

      <fieldset className="example">
        <legend>Example 2</legend>
        <p>
          When I was 17, I only had one friend. Extremely good friend. One day he found a girlfriend,
          and suddenly stopped paying attention to me. I fell into depression. I was betrayed.
        </p>
        <p>There are 3 ways to update your strategy after this:</p>
        <Option n={1} title="Option 1: Stop trusting">
          <p>
            No relationships – no problem! The <strong>cost</strong> is that you are now incapable of
            long-term collaboration, intimacy, or sincere friendship. But you won’t get hurt!
          </p>
        </Option>
        <Option n={2} title="Option 2: Don’t update your strategy">
          <p>
            Forget the betrayal. You’re yearning to get back what you had, so find another friend, and
            trust them with all your heart again. Enjoy yourself until you get abandoned again.
          </p>
        </Option>
        <Option n={3} title={<>Option 3: Become <strong>Robust</strong></>}>
          <p>
            Have fallback relationships. Rely on multiple people from separate groups. Have both remote
            and local friends. Be prepared for sudden hostility from anyone. Learn to quickly build a
            network around yourself.
          </p>
        </Option>
      </fieldset>

      <p>Google promises you unlimited storage. They will take it away.</p>
      <p>Your lover promises you comfort. They will take it away.</p>
      <p>Your country promises you democracy. They will take it away.</p>

      <p><span className="mark-1">If you trust no one</span>, you’ll miss a lot of opportunities.</p>
      <p><span className="mark-2">If you put all your trust into something</span>, you’ll be a victim.</p>
      <p>If you want to be free, <span className="mark-3">be strategic about your trust</span>.</p>
    </>
  );
}
