document.getElementById('btnMembership').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.setItem('fromLoginToMembership', 'true');
    window.location.href = 'membership.html';
});

function togglePassword() {
    var pass = document.getElementById("password");
    console.log('pass :',pass)
    pass.type = (pass.type === "password") ? "text" : "password";
}

function login(event) {
    event.preventDefault();

    const requiredFields = [
        { selector: '#username', name: 'username' },
        { selector: '#password', name: 'password' }
    ];

    for (let field of requiredFields) {
        const value = $(field.selector).val().trim();
        if (value === '' || value === '--- เลือก ---') {
            alert('กรุณากรอก ' + field.name);
            $(field.selector).focus();
            return false;
        }
    }

     const username = $('#username').val().trim()
     const password = $('#password').val().trim()

    $.ajax({
        url: 'http://localhost:3000/api/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username: username , password: password}),
        success: function(res) {
            if(res.exists) {
               window.location.href = 'main.html?username=' + username;
            } else {
                alert('Username หรือ Passeord ไม่ถูกต้อง');
            }
        },
        error: function(xhr) {
            alert(xhr.responseJSON?.message || 'เกิดข้อผิดพลาด');
        }
    });
}