// Biến toàn cục
var dsnv = new DanhSachNhanVien();
var validation = new Validation();


// Hàm rút gọn cú pháp get Element
function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}
function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();

function hienThiTable(mang) {
    var content = "";
    mang.map(function (nv, viTri) {
        content += `<tr>
         <td>${nv.taiKhoan}</td>
         <td>${nv.hoTen}</td>
         <td>${nv.email}</td>
         <td>${nv.ngayLam}</td>
         <td>${nv.chucVu}</td>
         <td>${nv.tongLuong}</td>
         <td>${nv.loaiNV}</td>
         <td>
            <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
            <button class="btn btn-info" onclick="xemChiTiet('${nv.taiKhoan}')">Xem</button>

         </td>

        </td>`

    });
    getELE("tableDanhSach").innerHTML = content;

}

function themNV() {
    // B1: Lấy thông tin từ form
    var TKNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var emailNV = getELE("email").value;
    var passNV = getELE("password").value;
    var ngayNV = getELE("datepicker").value;
    var luongNV = getELE("luongCB").value;
    var chucNV = getELE("chucvu").value;
    var gioNV = getELE("gioLam").value;
    // console.log(TKNV,tenNV,emailNV,passNV,ngayNV,luongNV,chucNV,gioNV);

    // VALIDATION
    var isValid = true;
    // 1. Kiểm tra Tài khoản NV
    isValid &= validation.checkEmpty(TKNV, "tbTKNV", "Tài khoản không được để trống")&& validation.checkID(TKNV,"tbTKNV","Tài khoản bị trùng",dsnv.mangNV);

    // 2. Kiểm tra tên NV
    isValid &= validation.checkEmpty(tenNV, "tbTen", "Tên không được để trống")&& validation.checkName(tenNV, "tbTen", "Tên không chứa số");

    // 3. Kiểm tra email
    isValid &= validation.checkEmpty(emailNV, "tbEmail", "Email không được để trống")&& validation.checkEmail(emailNV,"tbEmail","Email không đúng định dạng");

    // 4. Kiểm tra mật khẩu
    isValid &= validation.checkEmpty(passNV, "tbMatKhau", "Mật khẩu không được để trống")&& validation.checkPass(passNV,"tbMatKhau","Mật khẩu phải chứa chữ hoa, chữ thường, số và kí hiệu đặc biệt");

    // 5. Kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngayNV, "tbNgay", "Ngày vào làm không được để trống")&& validation.checkDate(ngayNV, "tbNgay","Ngày làm phải đúng định dạng dd/mm/yyyy");

    // 6. Kiểm tra lương CB
    isValid &= validation.checkEmpty(luongNV, "tbLuongCB", "Lương cơ bản không được để trống")&& validation.checkNumber(luongNV,"tbLuongCB","Tiền lương phải lớn hơn 0")&& validation.checkLimitNumber(luongNV,"tbLuongCB","Lương phải nằm trong khoảng 1.000.000 - 20.000.000",1e6,20e6);

    // 7. Kiểm tra chức vụ 
    isValid &= validation.checkDropDown("chucvu","tbChucVu","Bạn chưa chọn chức vụ");

    // 8. Kiểm tra giờ làm
    isValid &= validation.checkEmpty(gioNV, "tbGiolam", "Giờ làm không được để trống")&& validation.checkNumber(gioNV,"tbGiolam","Giờ làm phải lớn hơn 0")&& validation.checkLimitNumber(gioNV,"tbGiolam","Giờ làm phải nằm trong khoảng 80 - 200 giờ",80,200);

    if(isValid) {
        // tất cả dữ liệu nhập vào hợp lệ
        // B2: Lưu thông tin vào lớp nhân viên
        // thể hiện lớp instance
        var nv = new NhanVien(TKNV, tenNV, emailNV, passNV, ngayNV, luongNV, chucNV, gioNV);
        nv.tongLuong = nv.tinhLuong();
        nv.loaiNV = nv.xepLoai();
        // console.log(nv);

        // B3: Lưu sv vào danh sách nhân viên
        dsnv.themNhanVien(nv);
        // console.log(dsnv.mangNV);

        setLocalStorage();

        // B4: Hiện thị table
        hienThiTable(dsnv.mangNV);
    }
}

function xoaNV(tknv) {
    dsnv.xoaNhanVien(tknv);

    hienThiTable(dsnv.mangNV);
    setLocalStorage();
}

function xemChiTiet(tknv) {
    var viTri = dsnv.timViTri(tknv);
    var nv = dsnv.mangNV[viTri];
    getELE("tknv").disabled = true;

    getELE("tknv").value = nv.taiKhoan;
    getELE("name").value = nv.hoTen;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCB;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLam;
}

function capNhatNV(nv) {
    var TKNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var emailNV = getELE("email").value;
    var passNV = getELE("password").value;
    var ngayNV = getELE("datepicker").value;
    var luongNV = parseInt(getELE("luongCB").value);
    var chucNV = getELE("chucvu").value;
    var gioNV = parseInt(getELE("gioLam").value);

    var nv = new NhanVien(TKNV, tenNV, emailNV, passNV, ngayNV, luongNV, chucNV, gioNV);
    nv.tongLuong = nv.tinhLuong();
    nv.loaiNV = nv.xepLoai();

    dsnv.capNhatNhanVien(nv);
    hienThiTable(dsnv.mangNV);
    setLocalStorage();
}

function timKiemNV(){
    var tuKhoa = getELE("searchName").value;
    var mangKQ = dsnv.timNhanVien(tuKhoa);
    hienThiTable(mangKQ);
}
