$(function () {
    var booksList = $('#books');

    $.ajax({
        url: "http://localhost:8282/books",
        method: "GET"
    })
        .done(function (books) {
            console.log("dane pobrano z sukcesem");
            console.log(books);

            books.forEach(book => {
                $("<p data-id='" + book.id + "'>" + book.title + "</p><div></div>").appendTo(booksList);
            })
        });

    booksList.on('click', 'p', function () {

        var bookInfo = $(this).next('div');
        $.ajax({
            url: "http://localhost:8282/books/" + this.dataset.id,
            method: "GET"
        })
            .done(function (book) {
                bookInfo.text(book.id + " " + book.isbn + " " + book.title + " " + book.author + " " + book.publisher + " " + book.type);
            })
    })
});