let bookmax = 20;

function LastRead() {
    this.bookList = "bookList";
}

LastRead.prototype = {
    set: function(bid, url, bookname, chaptername, author, readtime, category) {
        // 检查所有必要的参数，包括新添加的类别
        if (!(bid && url && bookname && chaptername && author && readtime && category)) return;

        // 更新存储的格式，添加类别
        var v = bid + '#' + url + '#' + bookname + '#' + chaptername + '#' + author + '#' + readtime + '#' + category;

        var aBooks = lastread.getBook();
        var aBid = [];
        for (var i = 0; i < aBooks.length; i++) {
            aBid.push(aBooks[i][0]);
        }

        if ($.inArray(bid, aBid) != -1) {
            lastread.remove(bid);
        } else {
            while (aBooks.length >= bookmax) {
                lastread.remove(aBooks[0][0]);
                aBooks = lastread.getBook();
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
                books.replace(reg, "#" + v);
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
        var reg = new RegExp("(^|#)" + v);
        var books = this.getItem(this.bookList);
        if (!books) {
            books = "";
        } else {
            if (books.search(reg) != -1) {
                books = books.replace(reg, "");
            }
        }
        this.setItem(this.bookList, books);
    },

    setItem: function(k, v) {
        if (!!window.localStorage) {
            localStorage.setItem(k, v);
        } else {
            var expireDate = new Date();
            var EXPIR_MONTH = 30 * 24 * 3600 * 1000;
            expireDate.setTime(expireDate.getTime() + 12 * EXPIR_MONTH);
            document.cookie = k + "=" + encodeURIComponent(v) + ";expires=" + expireDate.toGMTString() + "; path=/";
        }
    },

    getItem: function(k) {
        var value = "";
        var result = "";
        if (!!window.localStorage) {
            result = window.localStorage.getItem(k);
            value = result || "";
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
        if (!!window.localStorage) {
            window.localStorage.removeItem(k);
        } else {
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() - 1000);
            document.cookie = k + "= " + ";expires=" + expireDate.toGMTString();
        }
    },

    removeAll: function() {
        if (!!window.localStorage) {
            window.localStorage.clear();
        } else {
            var v = this.getItem(this.bookList) ? this.getItem(this.bookList).split("#") : [];
            var books = [];
            if (v.length) {
                for (var i in v) {
                    this.removeItem(v[k]);
                }
            }
            this.removeItem(this.bookList);
        }
    }
};

function removebook(k) {
    lastread.remove(k);
    showtempbooks();
}

function removeall() {
    lastread.removeAll();
    showtempbooks();
}

function showtempbooks() {
    var books = lastread.getBook().reverse(); // 倒序
    let bookhtml = '';
    if (books.length) {
        for (var i = 0; i < books.length; i++) {
            if (i < bookmax) {
				bookhtml += '<div class="row tab-content">';
				bookhtml += '<div class="col-2 col-md-1  kind">[' + books[i][1] + ']</div>';
				bookhtml += '<div class="col-5 col-md-3  bookname"><a href="' + books[i][0] + '">' + books[i][3] + '</a></div>';
				bookhtml += '<div class="col-5 col-md-4 chap"><a href="' + books[i][2] + '" target="_blank">' + books[i][4] + '</a></div>';
				bookhtml += '<div class="col-md-2 author d-none d-sm-block">' + books[i][5] + '</div>';
				bookhtml += '<div class="col-md-2 time d-none d-sm-block">><a href="javascript:removebook(\'' + books[i][1] + '\')" onclick="return confirm(\'确定要将本书移除吗？\')">移除</a></div>';
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

