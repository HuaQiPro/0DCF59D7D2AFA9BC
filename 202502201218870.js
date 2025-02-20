let bookmax = 20;

function LastRead() {
    this.bookList = "bookList";
}

LastRead.prototype = {
    set: function(bid, url, bookname, chaptername, author, readtime, category) {
        if (!(bid && url && bookname && chaptername && author && readtime && category)) return;

        var v = bid + '#' + url + '#' + bookname + '#' + chaptername + '#' + author + '#' + readtime + '#' + category;

        var aBooks = this.getBook();
        var aBid = aBooks.map(book => book[0]);

        if ($.inArray(bid, aBid) != -1) {
            this.remove(bid); // 使用this
        } else {
            while (aBooks.length >= bookmax) {
                this.remove(aBooks[0][0]); // 使用this
                aBooks = this.getBook();
            }
        }

        this.setItem(bid, v);
        this.setBook(bid);
    },

    get: function(k) {
        return this.getItem(k) ? this.getItem(k).split("#") : "";
    },

    remove: function(k) {
        this.removeItem(k);
        this.removeBook(k);
    },

    setBook: function(v) {
        var reg = new RegExp("(^|#)" + v);
        var books = this.getItem(this.bookList);
        if (books == "") {
            books = v;
        } else {
            if (books.search(reg) == -1) {
                books += "#" + v;
            } else {
                books = books.replace(reg, "#" + v); // 确保更新
            }
        }
        this.setItem(this.bookList, books);
    },

    getBook: function() {
        var v = this.getItem(this.bookList) ? this.getItem(this.bookList).split("#") : [];
        var books = [];
        if (v.length) {
            for (var i = 0; i < v.length; i++) {
                var tem = this.getItem(v[i]).split('#');
                if (tem.length > 3) books.push(tem);
            }
        }
        return books;
    },

    removeBook: function(v) {
        console.log("Removing book from list:", v); // 调试信息
        var reg = new RegExp("(^|#)" + v + "(#|$)"); // 确保边界
        var books = this.getItem(this.bookList);
        if (!books) {
            books = "";
        } else {
            if (books.search(reg) != -1) {
                books = books.replace(reg, "$1$2").replace(/(^#|#$)/g, ""); // 处理边界
            }
        }
        this.setItem(this.bookList, books); // 更新书籍列表
        console.log("Updated book list:", this.getItem(this.bookList)); // 确认更新后的书籍列表
    },

    setItem: function(k, v) {
        if (!!window.localStorage) {
            localStorage.setItem(k, v);
        } else {
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + 30 * 24 * 3600 * 1000); // 30 天
            document.cookie = k + "=" + encodeURIComponent(v) + ";expires=" + expireDate.toGMTString() + "; path=/";
        }
    },

    getItem: function(k) {
        var value = "";
        if (!!window.localStorage) {
            value = window.localStorage.getItem(k) || "";
        } else {
            var reg = new RegExp("(^| )" + k + "=([^;]*)(;|$)");
            var result = reg.exec(document.cookie);
            if (result) {
                value = decodeURIComponent(result[2]) || "";
            }
        }
        return value;
    },

    removeItem: function(k) {
        console.log("Removing item from storage:", k); // 调试信息
        if (!!window.localStorage) {
            window.localStorage.removeItem(k);
        } else {
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() - 1000);
            document.cookie = k + "=;expires=" + expireDate.toGMTString();
        }
    }
};

// 移除书籍
function removebook(k) {
    console.log("Removing book:", k); // 确认移除的书籍 URL
    lastread.remove(k); // 移除书籍
    showtempbooks(); // 更新书籍列表
}

// 显示书籍
function showtempbooks() {
    var books = lastread.getBook().reverse(); // 倒序
    console.log("Current books:", books); // 确认当前书籍
    let bookhtml = '';
    if (books.length) {
        for (var i = 0; i < books.length; i++) {
            if (i < bookmax) {
                bookhtml += '<div class="row tab-content">';
                bookhtml += '<div class="col-2 col-md-1  kind">[' + books[i][0] + ']</div>';
                bookhtml += '<div class="col-5 col-md-3  bookname"><a href="' + books[i][1] + '">' + books[i][3] + '</a></div>';
                bookhtml += '<div class="col-5 col-md-4 chap"><a href="' + books[i][2] + '" target="_blank">' + books[i][4] + '</a></div>';
                bookhtml += '<div class="col-md-2 author d-none d-sm-block">' + books[i][5] + '</div>';
                bookhtml += '<div class="col-md-2 time d-none d-sm-block"><a href="javascript:removebook(\'' + books[i][1] + '\')" onclick="return confirm(\'确定要将本书移除吗？\')">移除</a></div>';
                bookhtml += '</div>';
            }
        }
    } else {
        bookhtml += '<span>没有阅读记录。</span>';
    }
    $("#tempBookcase").html(bookhtml);
}

// 初始化 LastRead 对象
window.lastread = new LastRead();
