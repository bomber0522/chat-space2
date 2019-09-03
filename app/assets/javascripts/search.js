$(document).on('turbolinks:load', function(){
  var searchField = $("#user-search-field");
  var searchResult = $("#user-search-result");
  var groupUser = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    searchResult.append(html);
  }

  function appendNoUser(notice) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ notice }</p>
                </div>`
    searchResult.append(html);
  }

  function appendGroupUser(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member', id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    groupUser.append(html);
  }

  searchField.on("keyup", function() {
    var inputName = searchField.val();

    if (inputName.length) {
      $.ajax({
        url: '/users',
        type: "GET",
        data: { keyword: inputName },
        dataType: 'json'
      })
      .done(function (users) {
        searchResult.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function () {
        alert('ユーザー検索に失敗しました');
      })
    } else {
      searchResult.empty();
    }
  })

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function () {
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    $(this).parent().remove();
    appendGroupUser(user_id, user_name);
  })

  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function () {
    $(this).parent().remove();
  })
})
