$('#chatForm').on('submit', function(e) {
    e.preventDefault()

    var data = $('#chatForm').serialize()

    console.log(data);

    $.ajax({
        type: "POST",
        url: 'http://localhost:5000/contacts',
        dataType: 'application/json',
        processData: false,
        data: data,
        success: function(response) {
            alert(JSON.stringify(response))
        },
        config: {
            headers: {
                "_Access-Control-Allow-Origin": '*',
                get "Access-Control-Allow-Origin" () {
                    return this["_Access-Control-Allow-Origin"];
                },
                set "Access-Control-Allow-Origin" (value) {
                    this["_Access-Control-Allow-Origin"] = value;
                },
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Origin,X-Auth-Token, Accept',
                'Access-Control-Allow-Credentials': true,
                'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
                'cache-control': 'no-cache',
                'Origin': 'localhost:5000'
            }
        }
    })
})