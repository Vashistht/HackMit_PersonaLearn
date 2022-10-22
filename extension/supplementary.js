const BACKEND_URL = 'http://localhost:3000';

onDocumentReady(async () => {
  const queryParameters = window.location.search.split('?')[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const encodedComprehensionData = urlParameters.get('data');
  const comprehensionData = JSON.parse(decodeURIComponent(encodedComprehensionData));

  const response = await fetch(`${BACKEND_URL}/parameter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comprehensionData),
  });

  const relatedMaterials = await response.json();
  console.log(relatedMaterials)
  displayRelatedMaterials(relatedMaterials);
});

/**
 * Display related materials of the form:
 * [
 *   {
 *     title: string,
 *     thumbnail: string,
 *     url: string,
 *     topics: Array<string>, // topics that the material is related to
 *   }
 * ]
 */
function makeRelatedMaterialElement(relatedMaterial) {
  const { title, thumbnail, url, topics } = relatedMaterial;

  const titleElmt = document.createElement('h3');
  titleElmt.className = 'material-title';
  titleElmt.innerHTML = title;

  const topicsElmt = document.createElement('p');
  topicsElmt.className = 'material-topics';
  topicsElmt.textContent = 'Topics: ' + topics.join(', ');

  const materialDetails = document.createElement('div');
  materialDetails.className = 'material-details';
  materialDetails.appendChild(titleElmt);
  materialDetails.appendChild(topicsElmt);

  const thumbnailElmt = document.createElement('img');
  thumbnailElmt.className = 'material-thumbnail';
  thumbnailElmt.src = thumbnail;

  const containerElmt = document.createElement('div');
  containerElmt.className = 'material-container';
  containerElmt.appendChild(thumbnailElmt);
  containerElmt.appendChild(materialDetails);

  const linkElmt = document.createElement('a');
  linkElmt.className = 'material-link';
  linkElmt.href = url;
  linkElmt.target = '_blank';
  linkElmt.appendChild(containerElmt);

  return linkElmt;
}

function displayRelatedMaterials(relatedMaterials) {
  const resultsElmt = document.getElementById('results');
  const children = relatedMaterials.map(makeRelatedMaterialElement);
  console.log(children)
  resultsElmt.replaceChildren(...children)
}
