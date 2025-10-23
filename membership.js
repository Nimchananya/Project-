$(document).ready(function() {
    const fromLogin = sessionStorage.getItem('fromLoginToMembership');
    if (!fromLogin) {
        alert('กรุณาเข้าสู่หน้าสมัครสมาชิกจากหน้าเข้าสู่ระบบเท่านั้น');
        window.location.href = 'login.html';
        return;
    }
    sessionStorage.removeItem('fromLoginToMembership');
});


const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

passwordInput.addEventListener('input', () => {
    passwordInput.value = passwordInput.value.replace(/[^a-zA-Z0-9]/g, '');
    const value = passwordInput.value;
    document.getElementById('ruleUpper').style.color = /[A-Z]/.test(value) ? 'green' : 'red';
    document.getElementById('ruleLower').style.color = /[a-z]/.test(value) ? 'green' : 'red';
    document.getElementById('ruleNumber').style.color = /[0-9]/.test(value) ? 'green' : 'red';
    document.getElementById('ruleLength').style.color = value.length >= 8 && value.length <= 20 ? 'green' : 'red';
});

function checkuser(event) {
    event.preventDefault();

    const requiredFields = [
        { selector: 'input[placeholder="กรอกชื่อผู้ใช้"]', name: 'ชื่อผู้ใช้' },
        { selector: '#passwordInput', name: 'รหัสผ่าน' },
        { selector: '.user-type', name: 'ประเภท' },
        { selector: '#fullName', name: 'ชื่อ–สกุล/ชื่อบริษัท' },
        { selector: '#road', name: 'ถนน' },
        { selector: '#district', name: 'อำเภอ/เขต' },
        { selector: '#province', name: 'จังหวัด' },
        { selector: '#zipCode', name: 'รหัสไปรษณีย์' },
        { selector: '#contactFirstName', name: 'ชื่อผู้ติดต่อ' },
        { selector: '#contactLastName', name: 'สกุลผู้ติดต่อ' },
        { selector: '#phone', name: 'เบอร์โทรศัพท์' },
        { selector: '#email', name: 'อีเมล' }
    ];

    for (let field of requiredFields) {
        const value = $(field.selector).val().trim();
        if (value === '' || value === '--- เลือก ---') {
            alert('กรุณากรอก/เลือก ' + field.name);
            $(field.selector).focus();
            return false;
        }
    }

    const username = $('input[placeholder="กรอกชื่อผู้ใช้"]').val().trim();

    $.ajax({
        url: 'http://localhost:3000/api/checkuser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username: username }),
        success: function(res) {
            console.log('res : ', res);
            if(res.exists) {
                alert('ชื่อผู้ใช้นี้ถูกใช้แล้ว: ' + res.username);
            } else {
                insert();
            }
        },
        error: function(xhr) {
            alert(xhr.responseJSON?.message || 'เกิดข้อผิดพลาด');
        }
    });
}

function insert() {
    const data = {
    type_company: $('.user-type').val(),                  
    neme_company: $('#fullName').val().trim(),           
    address_company: $('#addressNumber').val().trim(),
    group_company: $('#villageNumber').val().trim(), 
    village_company: $('#building').val().trim(),      
    ally_company: $('#soi').val().trim(),             
    road_company: $('#road').val().trim(),
    district_company: $('#subDistrict').val().trim(),
    county_company: $('#district').val().trim(),
    province_company: $('#province').val().trim(),
    zicode_company: $('#zipCode').val().trim(),
    prefix_company: $('#contactPrefix').val().trim(),
    name: $('#contactFirstName').val().trim(),
    lastname: $('#contactLastName').val().trim(),
    phonenumber: $('#phone').val().trim(),
    email: $('#email').val().trim(),
    ref: $('#refCode').val().trim(),
    username: $('input[placeholder="กรอกชื่อผู้ใช้"]').val().trim(),
    password: $('#passwordInput').val().trim()
};
    $.ajax({
        url: 'http://localhost:3000/api/inser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(res) {
            alert(res.message || 'สมัครสมาชิกเรียบร้อย');
             window.location.href = 'login.html';
        },
        error: function(xhr) {
            alert(xhr.responseJSON?.message || 'เกิดข้อผิดพลาด');
        }
    });
}
