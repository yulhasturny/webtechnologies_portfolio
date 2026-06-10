console.log("SCRIPT LÄUFT");
const projectId = "26s420cy";

const query = encodeURIComponent(`
  *[_type == "project"]{
    title,
    description,
    year,
    "imageUrl": image.asset->url
  }
`);

fetch(`https://${projectId}.api.sanity.io/v2021-10-21/data/query/production?query=${query}`)
  .then(res => res.json())
  .then(data => {
   const container = document.getElementById("projects-container");
console.log(container);

    data.result.forEach(project => {
  const imageUrl = project.image?.asset?._ref;

container.innerHTML += `
  <div class="project-card">
    ${
      project.imageUrl
        ? `<img src="${project.imageUrl}" alt="${project.title}" style="max-width: 100%;">`
        : ""
    }
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <p>${project.year}</p>
  </div>
`;
    });
  });