// Lớp DanhSachNhanVien 
function DanhSachNhanVien(){
    // Thuộc tính
    this.mangNV = [];

    // Phương thức
    // Thêm NV
    this.themNhanVien = function(nv){
        this.mangNV.push(nv);
    }
    // Tìm NV
    this.timViTri = function(tknv){
        var viTri = -1;
        this.mangNV.map(function(nv,viTriCanTim){
            if(nv.taiKhoan == tknv){
                viTri = viTriCanTim;
            }
        });
        return viTri;
    }
    // Xoá NV
    this.xoaNhanVien = function(tknv){
        var viTri = this.timViTri(tknv);
        if(viTri >= 0){
            // tìm được
            this.mangNV.splice(viTri,1);
        }else{
            console.log("Không tìm được");
        }
    }

    // Tìm vị trí
    this.capNhatNhanVien = function(nv){
        var viTri = this.timViTri(nv.taiKhoan);
        if(viTri >= 0){
            // tìm được
            this.mangNV[viTri] = nv;
        }else{
            console.log("Không tìm được");
        }
    }

    // Tìm NV
    this.timNhanVien = function(tuKhoa){
        var mangKQ = [];
        var lowerTK = tuKhoa.trim().toLowerCase();
        this.mangNV.map(function(item){
            //chuyển tên sv sang chữ thường
            var tenThuong = item.loaiNV.trim().toLowerCase();
            var kq = tenThuong.indexOf(lowerTK);
            if(kq >= 0){
                mangKQ.push(item);
            }
        })
        return mangKQ;
    }


}