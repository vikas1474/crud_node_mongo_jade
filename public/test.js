function deleteData(id) {
    $.ajax({url:'/api/v1/todos/' + id,type:'DELETE'}).success(function(res) {
      window.location.href = res.url;
    });
  }

  function updateData(id) {
    // $.ajax({url:'/api/v1/todos/' + id,type:'PUT'}).success(function(res) {
    //   window.location.href = res.url;
    // });
    console.log(id);
    window.location.href='/update/'+id;
  }