export default function validateAddUser(values) {
	let errors = {};
	
	// if (!values.Password) {
	// 	errors.Password = "Password is Required";
	// } else if (values.Password.length < 6) {
	// 	errors.Password = "Password must be at least 6 characters";
	// }
	// if (!values.cpassword) {
	// 	errors.cpassword = "Confirm Password is Required";
	// } else if (values.cpassword !== values.Password) {
	// 	errors.cpassword = "Password not matched";
	// }
	return errors;
}