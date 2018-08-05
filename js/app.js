$(function () {
    var booksList = $('#books');

    var loadBooks = function () {
        $.ajax({
            url: "http://localhost:8282/books",
            method: "GET"
        })
            .done(function (books) {
                console.log("dane pobrano z sukcesem");
                console.log(books);
                booksList.html("");
                books.forEach(book => {
                    $("<p data-id='" + book.id + "'>" + book.title + "<button class='delBtn btn btn-danger'>Usuń</button></p><div></div>").appendTo(booksList);
                })
            });
    };
    loadBooks();

    var addBook = function (e) {

        e.preventDefault();

        $.ajax({
            url: "http://localhost:8282/books",
            method: "POST",
            contentType: 'application/json',
            data:
                '{"isbn":"' + $("#isbn").val() + '", ' +
                '"title":"' + $("#title").val() + '", ' +
                '"publisher":"' + $("#publisher").val() + '",' +
                '"type":"' + $("#type").val() + '",' +
                '"author":"' + $("#author").val() + '"}',
        })
            .done(function () {
                console.log("powiodło się");

                loadBooks();
            })
            .fail(function () {
                console.log("niestety coś zawiodło");
                console.log('{"isbn":"' + $("#isbn").val() + '", ' +
                    '"title":"' + $("#title").val() + '", ' +
                    '"publisher":"' + $("#publisher").val() + '",' +
                    '"type":"' + $("#type").val() + '",' +
                    '"author":"' + $("#author").val() + '"}');
            })
    };

    $('#addBookBtn').on('click', addBook);


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
    booksList.on('click', 'button.delBtn', function (e) {
        var bookId = $(this).parent('p').data('id');
        console.log(bookId);
        e.preventDefault();
        console.log("http://localhost:8282/books/" + bookId);

        $.ajax({
            url: "http://localhost:8282/books/" + bookId,
            method: "DELETE"
        })
            .done(function () {
                loadBooks();
            })


    })
});