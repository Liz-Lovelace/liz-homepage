const T = ({ children }) => <span className="factorio-template">{children}</span>;

export default function Factorio() {
  return (
    <>
      <p>
        The goal of Factorio is to escape the planet you crash-landed on by launching a rocket. But
        what if instead of getting into the rocket, you launch a recon satellite?
      </p>
      <p>
        The satellite will permanently uncover a big area on the map, letting you place templates
        without being physically present. Construction bots will build the physical machines.
      </p>
      <p>
        This would abstract away the individual machines, letting you design, say, an <T>ore mining</T>{' '}
        template. You go to the map and put it on the nearest ore deposit. To transport the resources
        back to the base, you put down a bunch of <T>railroad + electricity line</T> templates.
        Construction bots get to work, and pretty soon a whole ore patch is added to your base’s
        resources.
      </p>
      <figure className="factorio-map">
        <img
          src="/blog/factorio.jpg"
          width="600"
          height="600"
          alt="A view of the map in Factorio with rectangles showing the modules built using templates"
        />
      </figure>
      <p>
        The large amount of resources lets you launch more recon satellites to uncover new areas of the
        map. You then combine all your templates into the <T>factory</T> template, which will output
        satellites, as well as machines for new <T>factory</T> instances.
      </p>
      <p>
        You’re two layers of abstraction above your machines now. Your organic body is irrelevant. You
        have become the factory. Eventually, the planet’s resources run out. Everything has become your
        synthetic flesh. You achieved the true ending. Or have you?
      </p>
      <div className="factorio-ending">
        <p><kbd>CTRL</kbd> + <kbd>A</kbd></p>
        <p><kbd>CTRL</kbd> + <kbd>C</kbd></p>
        <p><kbd>CTRL</kbd> + <kbd>V</kbd></p>
      </div>
      <img className="factorio-rocket" src="/blog/factorio-rocket.png" width="138" height="205" alt="The Factorio rocket" />
    </>
  );
}
