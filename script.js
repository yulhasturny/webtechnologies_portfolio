console.log("SCRIPT LÄUFT");

const query = encodeURIComponent(`
  *[_type=="project"]{
    title,
    description,
    year,
    slug,
    "imageUrl": image.asset->url
  }
`);

const url = `https://26s420cy.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("projects-container");

    data.result.forEach((project) => {
      container.innerHTML += `
        <a href="#" class="project-card" onclick="openProject('${project.slug.current}'); return false;">
          <article>

            <img src="${project.imageUrl}" alt="${project.title}">

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <p>${project.year}</p>

          </article>
        </a>
      `;
    });
  })
  .catch((error) => {
    console.error("Error loading projects:", error);
  });

function openProject(slug) {
  document.querySelector("#projects").style.display = "none";
  document.querySelector("#about").style.display = "none";
  document.querySelector("#project-view").style.display = "block";

  const query = encodeURIComponent(`
    *[_type=="project" && slug.current=="${slug}"][0]{
      title,
      description,
      year,
      "coverImage": image.asset->url,
      images[]{
        "url": asset->url
      }
    }
  `);

  const url = `https://26s420cy.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const project = data.result;

      document.getElementById("project-detail").innerHTML = `
        <div class="project-detail">

          <h1>${project.title}</h1>

          <img
            class="cover-image"
            src="${project.coverImage}"
            alt="${project.title}"
          >

          <div class="gallery">
            ${
              project.images
                ? project.images
                    .map(
                      (image) =>
                        `<img src="${image.url}" alt="${project.title}">`,
                    )
                    .join("")
                : ""
            }
          </div>

          <p>${project.year}</p>

          <p>${project.description}</p>

        </div>
      `;
    })
    .catch((error) => {
      console.error("Error loading project:", error);
    });
}

function backToProjects() {
  document.querySelector("#projects").style.display = "block";
  document.querySelector("#about").style.display = "block";
  document.querySelector("#project-view").style.display = "none";
}
