$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (!username) {
        alert("ไม่พบชื่อผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
        window.location.href = "login.html";
        return;
    }

    $.ajax({
        url: "http://localhost:3000/api/main",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ username: username }),
        success: function (res) {
            if (res.success) {
                const data = res.data;
                $("#value-name").text(data.neme_company || "-");
                $("#value-tax").text(data.idnumber || "-");
                $("#value-address-number").text(data.village_company || "-");
                $("#value-moo").text(data.group_company || "-");
                $("#value-building").text(data.village_company || "-");
                $("#value-soi").text(data.ally_company || "-");
                $("#value-road").text(data.road_company || "-");
                $("#value-subdistrict").text(data.district_company || "-");
                $("#value-district").text(data.county_company || "-");
                $("#value-province").text(data.province_company || "-");
                $("#value-zipcode").text(data.zicode_company || "-");
            } else {
                alert(res.message || "ไม่พบข้อมูลผู้ใช้");
            }
        },
        error: function (xhr) {
            console.error(xhr);
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        },
    });
});