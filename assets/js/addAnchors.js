const selectors = 'h2[id], h3[id]'
const headings = document.querySelectorAll(selectors);
const linkContent = '🔗';

for (const heading of headings) {
    const linkIcon = document.createElement('a');
    linkIcon.setAttribute('href', `#${heading.id}`);
    linkIcon.setAttribute('class', 'anchor-link')
    linkIcon.innerHTML = linkContent;
    heading.appendChild(linkIcon);
}
