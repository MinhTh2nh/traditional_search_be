const bcrypt = require('bcrypt');
const db = require('../db');
// const nodemailer = require('nodemailer');


exports.changePassword = (req, res) => {
    const { id, oldPassword, newPassword } = req.body; // Get user ID, old password, and new password from request body

    // Retrieve hashed password from the database for the given user ID
    db.query('SELECT password FROM accounts WHERE id = ?', [id], async (err, result) => {
        if (err) {
            console.error('Error retrieving password:', err);
            return res.status(500).json({ message: 'Error retrieving password.' });
        }

        if (result.length > 0) {
            const hashedPassword = result[0].password;

            try {
                // Check if the entered old password matches the stored hashed password
                const isPasswordMatch = await bcrypt.compare(oldPassword, hashedPassword);

                if (isPasswordMatch) {
                    // Hash the new password before updating in the database
                    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Change 10 to your desired salt rounds

                    // Update the password in the database
                    db.query('UPDATE accounts SET password = ? WHERE id = ?', [hashedNewPassword, id], (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating password:', updateErr);
                            return res.status(500).json({ message: 'Error updating password.' });
                        }

                        return res.status(200).json({ message: 'Password updated successfully.' });
                    });
                } else {
                    return res.status(401).json({ message: 'Old password is incorrect.' });
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                return res.status(500).json({ message: 'Internal server error.' });
            }
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }
    });
};


// exports.forgotPassword = (req, res) => {
// const { email } = req.body;

//     db.query('SELECT * FROM accounts WHERE email = ?', [email], async (err, result) => {
//         if (err) {
//             console.error('Error retrieving user:', err);
//             return res.status(500).json({ message: 'Error retrieving user.' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const user = result[0];
//         const resetToken = generateResetToken(); // Generate reset token

//         // Update reset_token field in the database
//         db.query('UPDATE accounts SET reset_token = ? WHERE id = ?', [resetToken, user.id], async (updateErr) => {
//             if (updateErr) {
//                 console.error('Error updating reset token:', updateErr);
//                 return res.status(500).json({ message: 'Error updating reset token.' });
//             }

//             // Send email verification to the user
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                   user: 'your_email@gmail.com', // Your Gmail email address
//                   pass: 'your_password' // Your Gmail password or app-specific password
//                 }
//                 // Configure your email service (SMTP details)
//             });

//             const mailOptions = {
//                 from: 'your_email_address',
//                 to: email,
//                 subject: 'Password Reset Verification',
//                 text: `To reset your password, click the following link: https://yourwebsite.com/reset-password?token=${resetToken}`
//                 // You can modify the text or HTML content of the email as needed
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error('Error sending email:', error);
//                     return res.status(500).json({ message: 'Failed to send reset email.' });
//                 }
//                 console.log('Email sent:', info.response);
//                 return res.status(200).json({ message: 'Resent email sent successfully.' });
//             });
//         });
//     });
// };

// // Function to generate a reset token
// const generateResetToken = () => {
//     // Implement logic to generate a unique reset token (e.g., using a library like crypto or uuid)
//     return 'generated-reset-token'; // Replace this with your token generation logic
// };