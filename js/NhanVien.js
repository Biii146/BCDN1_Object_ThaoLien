// 1. Khai báo lớp đối tượng nhân viên
function NhanVien(tk,ten,email,mk,ngay,luong,chuc,gio){
    // thuộc tính
    this.taiKhoan = tk;
    this.hoTen = ten;
    this.email = email;
    this.matKhau = mk;
    this.ngayLam = ngay;
    this.luongCB = luong;
    this.chucVu = chuc;
    this.gioLam = gio;
    this.tongLuong = 0;
    this.loaiNV = "";

    // phương thức
    // tính tổng lương
    this.tinhLuong = function(){
        if(this.chucVu == "GD"){
            tongLuong = this.luongCB * 3;
            return tongLuong;
        }else if(this.chucVu == "TP"){
            tongLuong = this.luongCB * 2;
            return tongLuong;
        }else{
            tongLuong = this.luongCB;
            return tongLuong;
        }
    }

    // xếp loại NV
    this.xepLoai = function(){
        if(this.gioLam >= 192){
            loaiNV = "Xuất sắc";
            return loaiNV;
        }else if(this.gioLam >= 176 && this.gioLam < 192){
            loaiNV = "Giỏi";
            return loaiNV;
        }else if(this.gioLam >= 160 && this.gioLam < 176){
            loaiNV = "Khá";
            return loaiNV;
        }else{
            loaiNV = "Trung bình";
            return loaiNV;
        }
    }


}