export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  if (!links.length) return;
  const ul = document.createElement('ul');
  links.forEach((a) => {
    a.removeAttribute('class');
    const li = document.createElement('li');
    li.append(a);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
