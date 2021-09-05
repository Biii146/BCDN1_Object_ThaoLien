function Validation(){
    // 1. Phương thức kiểm tra trống
    this.checkEmpty = function(input,spanID,message){
        // Ko hợp lệ
        if(input.trim() == ""){
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }else{
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    // 2.1 Phương thức kiểm tra TKNV trùng
    this.checkID = function(input,spanID,message,mang){
        var isExist = false;
        isExist = mang.some(function(item){
            return item.taiKhoan === input.trim();
        });
        if(isExist){
            // TKNV trùng -> ko hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }else{
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    // 2.2 Kiểm tra định dạng tên
    this.checkName = function(input,spanID,message){
        var pattern = new RegExp ("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (pattern.test(input)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // 2.3 Kiểm tra định dạng email
    this.checkEmail = function (input, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (input.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // 2.4 Kiểm tra định dạng password
    this.checkPass = function (input, spanID, message){
        var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
        if (input.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // 2.5 Kiểm tra định dạng ngày làm
    this.checkDate = function(input, spanID, message){
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (pattern.test(input)) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // 2.6 Kiểm tra định dạng số của lương CB và giờ làm
    this.checkNumber = function(input, spanID, message){
        var pattern =  /^([0-9]+|(\d+(\.\d+)?))$/;
        if (input.match(pattern)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // 2.7 Kiểm tra định mức lương CB và giờ làm
    this.checkLimitNumber = function(input, spanID, message,numberFrom, numberTo){
        if (Number(input) < numberFrom || Number(input) > numberTo || Number(input) === 0) {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else{
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    // 2.8 Kiểm tra chức vụ 
    this.checkDropDown = function(selID, spanID, message){
        var optIndex = document.getElementById(selID).selectedIndex;
        console.log(optIndex);
        if (optIndex != 0) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
}