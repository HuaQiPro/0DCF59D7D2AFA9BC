$(function () {
  /*var h = window.location.href;
  var mid = h.substring(h.lastIndexOf("/") + 1, h.indexOf('.htm'))
  $.getJSON("/downloadInfo/list?mid=" + mid, function (list) {

    list.map(function (d) {
      var item = '<tr><td><input class="form-check-input m-0 align-middle" name="check-download" type="checkbox"></td><td class="text-muted">'+d.downloadCategory.name+'</td><td><a href="'+d.url+'"class="h5 text-muted"><code>'+d.url+'</code></a></td><td class="text-center text-muted">'+(d.password != 'none' ? d.password : '无')+'</td></tr>';
      $('#download-list').prepend(item)
    });
    $('.download-wrapper').removeClass('d-none');
  });*/
  const gallery = new Viewer(document.getElementById('posters'));
  if (window.member) {
    if ($('#forbidden').length > 0) {
      $('#forbidden').remove();
      $('#play-list .d-flex').removeClass('d-none');
      $('.download-wrapper').removeClass('d-none');
      $('#torrent-list').removeClass('d-none');
    }
  }
  let clipboard2 = new ClipboardJS('#copy-downloads', {
    text: function () {
      var text = '';
      $("[name='check-download']:checkbox").each(function() {
        if (this.checked) {
          text += $(this).parent().parent().find('a').prop('href') + '\n';
        }
      })
      return text;
    }
  });
  clipboard2.on('success', function(e) {
    $.toast({
      text: '复制成功',
      position: 'mid-center',
      icon: 'success',
      loader: false,
      stack: false
    });
  });
  $('#check-all-download').click(function() {
    console.info($("input[class='check-download']"))
    $("[name='check-download']:checkbox").each(function() {
      $(this).prop("checked", !this.checked);
    })
  });
})