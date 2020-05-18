$(document).ready(function () {
  let form = $("#form")
  form.submit(function (e) {
    e.preventDefault();

    let players = {
      playername1: form[0].playername1.value,
      playername2: form[0].playername2.value,
      playername3: form[0].playername3.value,
      playername4: form[0].playername4.value
    }

    let data = {
      players: Object.values(players),
      rounds: [[0, 0, 0, 0]],
    };

    $.ajax({
        url: "/api/games",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (result) {
          if (result.success) {
            let gameId = result.data._id;
            window.location.href = `/games/${gameId}`;
          }
        }
    })
  })
})
