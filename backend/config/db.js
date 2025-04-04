const mysql = require('mysql2');
const fs = require('fs');
const config = require('../loadENV');
// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Hàm đọc và thực thi script SQL
function executeSQLScript(filePath) {
    const script = fs.readFileSync(filePath, 'utf8');
    const statements = script.split(';').filter(stmt => stmt.trim()); // Tách các câu lệnh SQL
    statements.forEach(statement => {
        db.query(statement, (err, results) => {
            if (err) {
                console.error('Lỗi khi thực thi câu lệnh SQL: ', err);
            } else {
                console.log('Kết quả thực thi câu lệnh SQL: ', results);
            }
        });
        
    });
}

// Kết nối tới cơ sở dữ liệu
db.connect(err => {
    if (err) {
        console.error('Kết nối thất bại: ', err.stack);
        return;
    }
    console.log('Đã kết nối đến MySQL');

    // Đảm bảo thực thi script SQL sau khi kết nối thành công
    //executeSQLScript('./database/init.sql'); // Đường dẫn đến tệp SQL
});

module.exports = db;
