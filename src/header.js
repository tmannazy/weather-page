const pageHeader = () => {
  const header = document.createElement("header");
  const pageIcon = document.createElement("img");
  const h1 = document.createElement("h1");

  pageIcon.setAttribute("src", "./87f7f47e922b5771362f.jpg");
  pageIcon.classList.add("page-icon");
  h1.textContent = "Weather Page";
  h1.classList.add("page-title");
  header.append(pageIcon, h1);

  return header;
};

export { pageHeader };
