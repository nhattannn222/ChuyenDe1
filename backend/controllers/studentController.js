// controllers/studentController.js
const db = require('../config/db');


exports.getInfoStudents = (req, res) => {
    const ma_sv = req.params.ma_sv;

    // SQL query to get student info, courses, and advisor details
    const query = `
        SELECT 
            students.*, 
            courses.*, 
            advisors.ho_ten AS advisor_name
        FROM students
        LEFT JOIN courses ON students.ma_sv = courses.ma_sv
        LEFT JOIN advisors ON courses.co_van_id = advisors.id
        WHERE students.ma_sv = ?
    `;

    // Execute the query
    db.query(query, [ma_sv], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi khi lấy thông tin sinh viên', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });

        // Create a response object to structure the data
        const student = results[0];
        const courses = results.map(result => ({
            lop: result.lop,
            nganh: result.nganh,
            chuyen_nganh: result.chuyen_nganh,
            khoa: result.khoa,
            he_dao_tao: result.he_dao_tao,
            nien_khoa: result.nien_khoa
        }));
        
        // Send response
        res.json({
            statusCode: 200, 
            student: {
                ...student,
                courses,
                advisor_name: student.advisor_name // Advisor's name
            }
        });
    });
};
