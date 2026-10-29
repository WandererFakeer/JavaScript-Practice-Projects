import podcasts from "./data.js";
import createCustomElement from "./helperFunctions/createCustomElement.js";

/* 🌴 Save the Weekend 🌴

Your best friend is a copywriter who writes product descriptions 
for a living. You want to use your hacking skills to help them 
automate their job so you both can spend the weekend on a 
tropical island. 

Use array methods and the existing podcast data to write a function that
can generate a description for each podcast. 

Add the description as a new property on each podcast object, and return
a new podcast array where each podcast has a description. 

Each description should look like this: 
[
  {
    id: 1,
    title: "Scrimba Podcast", 
    ...
    description: "Scrimba Podcast is a 50 minute education podcast hosted 
    by Alex Booker."
  }
  ...
]

If the podcast has more than one host, you can display only the first host.

Stretch goal: Display all three hosts in the description, seperated with commas: 

Example description: "Coding Corner is a 55 minute education podcast hosted by Treasure Porth, Guil Hernandez, and Tom Chant."
*/

const podcastDetailsEl = document.querySelector(".podcast-details");

const state = {
  details: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.details) {
    const li = createCustomElement("li", null, null);

    const article = createCustomElement("article", "podcast-detail", null);

    const h2 = createCustomElement(
      "h2",
      "podcast-name",
      `${detail.id}. ${detail.title}`,
    );

    const miscleneousDetails = createCustomElement(
      "div",
      "podcast-misc-details",
      null,
    );

    const duration = createCustomElement(
      "p",
      "podcast-duration",
      `Duration: ${detail.duration} minutes`,
    );

    const tagsSection = createCustomElement(
      "section",
      "podcast-tags-section",
      null,
    );
    tagsSection.setAttribute("aria-labelledby", "tags");

    const tagsheading = createCustomElement("h3", null, "Tags: ");
    tagsheading.id = "tags";

    const tags = createCustomElement("ul", "podcast-tags", null);

    const tagsFragment = document.createDocumentFragment();

    for (const tag of detail.tags) {
      const tagItem = createCustomElement("li", "podcast-tag", tag);

      tagsFragment.append(tagItem);
    }

    tags.append(tagsFragment);
    tagsSection.append(tagsheading, tags);

    const hostsSection = createCustomElement(
      "section",
      "podcast-hosts-section",
      null,
    );
    hostsSection.setAttribute("aria-labelledby", "hosts");

    const hostsHeading = createCustomElement("h3", null, "Hosts: ");
    hostsHeading.id = "hosts";

    const hosts = createCustomElement("ul", "podcast-hosts", null);

    const hostsFragment = document.createDocumentFragment();

    for (const host of detail.hosts) {
      const hostItem = createCustomElement("li", "podcast-host", host);

      hostsFragment.append(hostItem);
    }

    hosts.append(hostsFragment);
    hostsSection.append(hostsHeading, hosts);

    const rating = createCustomElement(
      "p",
      "podcast-rating",
      `Rating: ${detail.rating}`,
    );

    const genre = createCustomElement(
      "p",
      "podcast-genre",
      `Genre: ${detail.genre}`,
    );

    const isPaid = createCustomElement(
      "p",
      "podcast-paid",
      `Paid: ${detail.paid}`,
    );

    miscleneousDetails.append(
      duration,
      tagsSection,
      hostsSection,
      rating,
      genre,
      isPaid,
    );

    const details = createCustomElement(
      "p",
      "podcast-details",
      `Details: ${detail.details}`,
    );

    article.append(h2, miscleneousDetails, details);

    li.append(article);

    fragment.append(li);
  }

  podcastDetailsEl.append(fragment);
}

// Return object with added new property
function createNewPropertyValue(obj) {
  
  const flatHosts = obj.hosts.flat();

  const hosts = (flatHosts.length === 1) ? flatHosts[0] : `${flatHosts.slice(0, -1).join(", ")} and ${flatHosts.at(-1)}`;

  return {
    ...obj,
    details: `${obj.title} is a ${obj.duration} minute education podcast hosted by ${hosts}.`,
  };
}

function createDescriptionsFor(data) {
  state.details = data.map((item) => createNewPropertyValue(item));

  render();

  return state.details;
}

createDescriptionsFor(podcasts);
