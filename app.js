const toggleSpinner = (displayStyle) => {
    document.getElementById("spinner").style.display = displayStyle;
};
const toggleSearchResult = (displayStyle) => {
    document.getElementById("books").style.display = displayStyle;
};
const searchBook = () => {
    searchField = document.getElementById("search-field");
    searchText = searchField.value;
    searchField.value = "";
    toggleSpinner('block');
    toggleSearchResult('none');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayBooks(data.docs, data.numFound));
};
const displayBooks = (books, datafounded) => {
    console.log(datafounded);
    console.log(books);
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    if (books.length === 0) {
        const div = document.createElement("div");
        div.classList.add("mx-auto");
        div.innerHTML = `<h5 class="text-danger text-center">book is not found</h5>`;
        searchResult.appendChild(div);
    } else {
        books.forEach((book) => {
            const imgUrlMedium = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
    <div class="card w-75 mx-auto h-100 overflow-hidden shadow rounded">
    <div class="book-img p-3 rounded">
    <img src="${imgUrlMedium}" class="card-img-top img-fluid" alt="...">
    <div>
        <div class="card-body">
          <h5 class="card-title">Book Name : ${book.title}</h5>        
          <h6>Author Name : ${book.author_name ? book.author_name : ""}</h6>
          <p>First publish Year : ${book.first_publish_year ? book.first_publish_year : "not found"
                }</p>
        </div>
      </div>
   `;
            console.log(book);
            searchResult.appendChild(div);
        });
    }

    const totalbook = books.length;
    const bookfound = document.getElementById("book-found");
    bookfound.innerHTML = `
  <h6 class="mt-4 p-3 text-center">showing  ${totalbook} results out of ${datafounded}</h6>
  `;
    toggleSpinner("none");
    toggleSearchResult("block");
};
