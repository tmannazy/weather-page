const pageHeader = () => {
  const header = document.createElement("header");
  const pageIcon = document.createElement("img");
  const h1 = document.createElement("h1");

  pageIcon.setAttribute("src", "");
  h1.textContent = "Weather Page";
  h1.classList.add("page-title");
  header.append(pageIcon, h1);

  return header;
};

export { pageHeader };
