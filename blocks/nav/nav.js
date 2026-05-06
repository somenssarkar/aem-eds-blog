export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  if (links.length < 2) return;

  const section = block.closest('.section');
  if (!section) return;

  // First link is the site brand; remaining links are nav items
  const [brandAnchor, ...navAnchors] = links;
  brandAnchor.removeAttribute('class');

  const brandSection = document.createElement('div');
  brandSection.className = 'section';
  const brandWrapper = document.createElement('div');
  brandWrapper.className = 'default-content-wrapper';
  const brandP = document.createElement('p');
  brandP.append(brandAnchor);
  brandWrapper.append(brandP);
  brandSection.append(brandWrapper);

  const navSection = document.createElement('div');
  navSection.className = 'section';
  const navWrapper = document.createElement('div');
  navWrapper.className = 'default-content-wrapper';
  const ul = document.createElement('ul');
  navAnchors.forEach((a) => {
    a.removeAttribute('class');
    const li = document.createElement('li');
    li.append(a);
    ul.append(li);
  });
  navWrapper.append(ul);
  navSection.append(navWrapper);

  // Replace the single block-section with brand + nav-items sections
  // header.js maps children[0] → nav-brand, children[1] → nav-sections
  section.replaceWith(brandSection, navSection);
}
