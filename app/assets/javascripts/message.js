$(document).on('turbolinks:load', function (){
  function buildHTML(message){

    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message-text__image">`
    var html = 
        `<div class="message" data-id="${message.id}">
          <div class="upper-info">
            <div class="upper-info__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-info__date">
              ${ message.created_at }
            </div>
          </div>
          <div class="message-text">
            <p class="message-text__content">
              ${ message.content }
            </p>
            ${imagehtml}
          </div>
        </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      $('.hidden').val('');
      return false
    })
    .fail(function(){
      alert('error');
    });
  })

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id');
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: 'get',
        dateType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  } , 5000 );
});
