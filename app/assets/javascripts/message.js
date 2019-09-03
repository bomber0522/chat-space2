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

  $('#new_message').on('turbolinks:load', 'submit', function(e){
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
});
