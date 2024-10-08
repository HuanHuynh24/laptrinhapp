// controllers/userController.js
const connectDB = require('../config/db');
const sql = require('mssql');

// Xử lý thêm người dùng
const addUser = async (req, res) => {
    try {
        const { ten, tuoi, gioitinh, diachi } = req.body;
        // Kết nối SQL Server và thực thi truy vấn
        const pool = await connectDB();
        const result = await pool.request()
            .input('ten', sql.VarChar, ten)
            .input('tuoi', sql.Int, tuoi)
            .input('gioitinh', sql.VarChar, gioitinh)
            .input('diachi', sql.VarChar, diachi)
            .query('INSERT INTO nguoidung (ten, tuoi, gioitinh, diachi)  VALUES (@ten, @tuoi, @gioitinh, @diachi)');
        
        res.status(200).send('Thêm người dùng thành công');
    } catch (err) {
        console.error('Lỗi:', err);
        res.status(500).send(`Lỗi khi thêm người dùng: ${JSON.stringify(req.body)}`);
        
    }
};

module.exports = { addUser };
